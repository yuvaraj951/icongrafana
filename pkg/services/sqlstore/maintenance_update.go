package sqlstore

import (
  "github.com/grafana/grafana/pkg/bus"
  m "github.com/grafana/grafana/pkg/models"

  "github.com/go-xorm/xorm"
)

func init()  {

  bus.AddHandler("sql",GetMaintenanceAlerts)
  bus.AddHandler("sql",GetMaintenanceAlertsByInterval)
  bus.AddHandler("sql",UpdateMaintenanceAlert)

}

func GetMaintenanceAlerts(query *m.GetMalfunalertHistoryQuery) error {

  query.Result = make([]*m.MalfunalertHistoryDTO, 0)
  sess := x.Table("malfunalert_history")
  sess.Where("malfunalert_history.org=?", query.Org)
  sess.Cols("malfunalert_history.id","malfunalert_history.org","malfunalert_history.message","malfunalert_history.sended","malfunalert_history.interval")

  err := sess.Find(&query.Result)
  return err
}

func GetMaintenanceAlertsByInterval(query *m.GetMalfunalertHistoryByIntervalQuery) error {

  query.Result = make([]*m.MalfunalertHistoryDTO, 0)
  sess := x.Table("malfunalert_history")
  sess.Where("malfunalert_history.interval=?", query.Interval)
  sess.Cols("malfunalert_history.id","malfunalert_history.org","malfunalert_history.status","malfunalert_history.message","malfunalert_history.sended","malfunalert_history.interval")

  err := sess.Find(&query.Result)
  return err
}

func UpdateMaintenanceAlert(cmd *m.UpdateMalfunalertHistory) error {
  return inTransaction(func(sess *xorm.Session) error {
    var stutus="Done"
    var rawSql = "UPDATE malfunalert_history SET  status=? WHERE Id=?"
    _, err := sess.Exec(rawSql,stutus,cmd.Id)
    if err != nil {
      return err
    }

    return validateOneAdminLeftInOrg(cmd.Org, sess)
  })
}
