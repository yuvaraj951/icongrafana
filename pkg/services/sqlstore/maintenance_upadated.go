package sqlstore

import (
  "github.com/grafana/grafana/pkg/bus"
  m "github.com/grafana/grafana/pkg/models"
  "github.com/go-xorm/xorm"

  "github.com/grafana/grafana/pkg/log"
  // "fmt"
  //"github.com/Unknwon/bra/cmd"

  "time"
)

func init()  {

  bus.AddHandler("sql",addMaintenanceAlerts)
  bus.AddHandler("sql",RemoveMaintenanceUpdate)

}

func addMaintenanceAlerts(cmd *m.AddMalfunalertActivity) error {
  return inTransaction(func(sess *xorm.Session) error {
    // check if user exists
    logger := log.New("main")
    logger.Info("AddProcessForCurrentOrg222",cmd.OrgId)




    entity := m.MalfunalertActivity{
      OrgId:   cmd.OrgId,
      Name:    cmd.Name,
      Message:cmd.Message,
      Updated:time.Now(),

    }

    _, err := sess.Insert(&entity)
    return err
  })
}

func RemoveMaintenanceUpdate(cmd *m.DeleteMalfunalertActivity) error {
  return inTransaction(func(sess *xorm.Session) error {
    var rawSql = "DELETE FROM malfunalert_activity WHERE org_id=? and id=?"
    _, err := sess.Exec(rawSql, cmd.OrgId, cmd.Id)
    if err != nil {
      return err
    }

    return validateOneAdminLeftInOrg(cmd.OrgId, sess)
  })
}
