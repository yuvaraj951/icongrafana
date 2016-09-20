package sqlstore

import (
  "github.com/grafana/grafana/pkg/bus"
  m "github.com/grafana/grafana/pkg/models"
  "github.com/go-xorm/xorm"
  "time"
  "github.com/grafana/grafana/pkg/log"
  // "fmt"
  //"github.com/Unknwon/bra/cmd"
  "github.com/grafana/grafana/pkg/events"
)

func init()  {

  bus.AddHandler("sql",GetMachine)
  bus.AddHandler("sql",addMachine)
  bus.AddHandler("sql",RemoveOrgMachine)
  bus.AddHandler("sql",UpdateMachine)
  bus.AddHandler("sql",GetMachineByMachineId)
  bus.AddHandler("sql",GetMachineById)
}

func GetMachine(query *m.GetMachineQuery) error {

  query.Result = make([]*m.MachineDTO, 0)
  sess := x.Table("machine")
  sess.Where("machine.org_id=?", query.OrgId)
  sess.Cols("machine.org_id","machine.machine_name","machine.machine_id","machine.description","machine.updated_by","machine.vendor")

  err := sess.Find(&query.Result)
  return err
}


func addMachine(cmd *m.AddMachineCommand) error {
  return inTransaction(func(sess *xorm.Session) error {
    // check if user exists
    logger := log.New("main")
    logger.Info("AddProcessForCurrentOrg222",cmd.OrgId)




    entity := m.Machine{
      OrgId:   cmd.OrgId,
      MachineName:    cmd.MachineName,
      Description:cmd.Description,
      ProcessId:cmd.ProcessId,
      UpdatedBy:cmd.UpdatedBy,
      Created: time.Now(),
      Updated: time.Now(),
      Vendor:cmd.Vendor,
    }

    _, err := sess.Insert(&entity)
    return err
  })
}


func RemoveOrgMachine(cmd *m.DeleteMachineCommand) error {
  return inTransaction(func(sess *xorm.Session) error {
    var rawSql = "DELETE FROM machine WHERE org_id=? and machine_id=?"
    _, err := sess.Exec(rawSql, cmd.OrgId, cmd.MachineId)
    if err != nil {
      return err
    }

    return validateOneAdminLeftInOrg(cmd.OrgId, sess)
  })
}

func UpdateMachine(cmd *m.UpdateMachineCommand) error {
  return inTransaction2(func(sess *session) error {
    logger := log.New("main")
    logger.Info("updatedProcess3 %s")


    machine := m.Machine{
      MachineId:cmd.MachineId,
      MachineName:    cmd.MachineName,
      Description:cmd.Description,
      UpdatedBy:cmd.UpdatedBy,
      Updated: time.Now(),
      Vendor:cmd.Vendor,
    }
    logger.Info("updatedProcess4 %s")



    if _, err := sess.Where("machine_id= ?",machine.MachineId).Update(&machine); err != nil {
      return err
    }


    logger.Info("updatedProcess5 %s")
    sess.publishAfterCommit(&events.MachineUpdated{
      Timestamp: machine.Created,
      MachineId: machine.MachineId,
      MachineName:machine.MachineName,
      Description:machine.Description,
      UpdatedBy:machine.UpdatedBy,
      Vendor:machine.Vendor,
    })

    return nil
  })
}


func GetMachineByMachineId(query *m.GetMachineByCodeQuery) error {
  var rawSql = `SELECT FROM ` + dialect.Quote("machine") + `WHERE machine_id=?`

  var tempUser m.MachineDTO
  sess := x.Sql(rawSql, query.MachineId)
  has, err := sess.Get(&tempUser)

  if err != nil {
    return err
  } else if has == false {
    return m.ErrTempUserNotFound
  }

  query.Result = &tempUser
  return err
}
func GetMachineById(query *m.GetMachineByIdQuery) error {
  logger := log.New("main")
  logger.Info("getMachine12345 %s",query.MachineId)

  var machine m.Machine
  exists, err := x.Where("machine_id= ?",query.MachineId).Get(&machine)
  if err != nil {
    return err
  }

  if !exists {
    return m.ErrOrgNotFound
  }

  query.Result = &machine
  return nil



}
