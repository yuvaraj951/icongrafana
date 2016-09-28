package sqlstore

import (
	"github.com/grafana/grafana/pkg/bus"
	m "github.com/grafana/grafana/pkg/models"

	"time"
	"github.com/grafana/grafana/pkg/events"
	"github.com/grafana/grafana/pkg/log"
)

func init()  {

	bus.AddHandler("sql",GetPendingAlertHistory)
	bus.AddHandler("sql",GetCompletedAlertHistory)
	bus.AddHandler("sql",GetPendingAlertActionHistory)
	bus.AddHandler("sql",UpdateAlertAction)
}

func GetPendingAlertHistory(query *m.GetPendingAlertHistory) error {

	query.Result = make([]*m.AlertHistoryDTO, 0)
	sess := x.Table("alert_history")
	sess.Where(" alert_history.status!='Done' AND alert_history.org_id=? ", query.OrgId)
	sess.Cols("alert_history.id","alert_history.org_id","alert_history.alert_message","alert_history.sended","alert_history.interval","alert_history.name","alert_history.message","alert_history.updated","alert_history.alert_type")

	err := sess.Find(&query.Result)
	return err
}
func GetCompletedAlertHistory(query *m.GetCompletedAlertHistory) error {

	query.Result = make([]*m.AlertHistoryDTO, 0)
	sess := x.Table("alert_history")
	sess.Where(" alert_history.status='Done' AND alert_history.org_id=? ", query.OrgId)
	sess.Cols("alert_history.id","alert_history.org_id","alert_history.alert_message","alert_history.sended","alert_history.interval","alert_history.name","alert_history.message","alert_history.updated","alert_history.alert_type")

	err := sess.Find(&query.Result)
	return err
}

func UpdateAlertAction(cmd *m.UpdateAlertActionCommand) error {
	return inTransaction2(func(sess *session) error {
		logger := log.New("main")
		logger.Info("updatedProcess3 %s")
		var status="Done"

		alertActon := m.AlertHistory{
			Id:cmd.Id,
			OrgId:    cmd.OrgId,
			AlertMessage:cmd.AlertMessage,
			Interval:cmd.Interval,
			Name:cmd.Name,
			Message:cmd.Message,
			Updated: time.Now(),
			Status:status,
		}
		logger.Info("updatedProcess4 %s")



		if _, err := sess.Where("id= ?",alertActon.Id).Update(&alertActon); err != nil {
			return err
		}


		logger.Info("updatedProcess5 %s")
		sess.publishAfterCommit(&events.AlertActionUpdate{
			Timestamp: alertActon.Updated,
			Id: alertActon.Id,
			AlertMessage:alertActon.AlertMessage,
			Status:alertActon.Status,
			Name:alertActon.Name,
			Message:alertActon.Message,
			Updated:alertActon.Updated,
		})

		return nil
	})
}





func GetPendingAlertActionHistory(query *m.GetPendingAlertActionHistory) error {
	logger := log.New("main")
	logger.Info("getMachine12345 %s",query.Id)

	var alertAction m.AlertHistory
	exists, err := x.Where("id= ?",query.Id).Get(&alertAction)
	if err != nil {
		return err
	}

	if !exists {
		return m.ErrOrgNotFound
	}

	query.Result = &alertAction
	return nil



}
