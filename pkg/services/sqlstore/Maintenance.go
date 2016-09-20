package sqlstore

import (
  "github.com/grafana/grafana/pkg/bus"
  m "github.com/grafana/grafana/pkg/models"
  "github.com/go-xorm/xorm"

  "github.com/grafana/grafana/pkg/log"
  // "fmt"
  //"github.com/Unknwon/bra/cmd"
  "time"
  "github.com/grafana/grafana/pkg/events"
)

func init()  {

  bus.AddHandler("sql",GetMaintenance)
  bus.AddHandler("sql",addMaintenance)
  bus.AddHandler("sql",RemoveMaintenance)
  bus.AddHandler("sql",GetMaintenanceById)
  bus.AddHandler("sql",UpdateMaintenance)
}

func GetMaintenance(query *m.GetMaintenanceQuery) error {

  query.Result = make([]*m.MaintenanceDTO, 0)
  sess := x.Table("maintenance")
  sess.Where("maintenance.Org=?", query.Org)
  sess.Cols("maintenance.Id","maintenance.Org","maintenance.Component","maintenance.Parameter","maintenance.Message","maintenance.Interval")

  err := sess.Find(&query.Result)
  return err
}


func addMaintenance(cmd *m.AddMaintenanceCommand) error {
  return inTransaction(func(sess *xorm.Session) error {
    // check if user exists
    logger := log.New("main")
    logger.Info("AddProcessForCurrentOrg222",cmd.Org)




    entity := m.Maintenance{
      Org:   cmd.Org,
      Component:    cmd.Component,
      Parameter:cmd.Parameter,
      Message:cmd.Message,
      Interval:cmd.Interval,

    }

    _, err := sess.Insert(&entity)
    return err
  })
}


func RemoveMaintenance(cmd *m.DeleteMaintenanceCommand) error {
  return inTransaction(func(sess *xorm.Session) error {
    var rawSql = "DELETE FROM maintenance WHERE Org=? and Id=?"
    _, err := sess.Exec(rawSql, cmd.Org, cmd.Id)
    if err != nil {
      return err
    }

    return validateOneAdminLeftInOrg(cmd.Org, sess)
  })
}

func GetMaintenanceById(query *m.GetMaintenanceByIdQuery) error {
  logger := log.New("main")
  logger.Info("getMachine12345 %s")

  var maintenance m.Maintenance
  exists, err := x.Id(query.Id).Get(&maintenance)
  if err != nil {
    return err
  }

  if !exists {
    return m.ErrOrgNotFound
  }

  query.Result = &maintenance
  return nil



}

func UpdateMaintenance(cmd *m.UpdateMaintenanceCommand) error {
  return inTransaction2(func(sess *session) error {
    logger := log.New("main")
    logger.Info("updatedProcess3 %s")


    maintenance := m.Maintenance{
      Id:cmd.Id,
      Component:    cmd.Component,
      Parameter:cmd.Parameter,
      Message:cmd.Message,
      Interval: cmd.Interval,

    }
    logger.Info("updatedProcess4 %s")



    if _, err := sess.Where("Id= ?",maintenance.Id).Update(&maintenance); err != nil {
      return err
    }


    logger.Info("updatedProcess5 %s")
    sess.publishAfterCommit(&events.MaintenanceUpdated{
      Timestamp: time.Now(),
      Id: maintenance.Id,
      Component:maintenance.Component,
      Parameter:maintenance.Parameter,
      Message:maintenance.Message,
      Interval:maintenance.Interval,
    })

    return nil
  })
}
