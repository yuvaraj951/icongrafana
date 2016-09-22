package sqlstore

import (
	"github.com/grafana/grafana/pkg/bus"
	m "github.com/grafana/grafana/pkg/models"


)

func init()  {

	bus.AddHandler("sql",GetMaintenanceActivity)

}

func GetMaintenanceActivity(query *m.GetMaintenanceActivity) error {

	query.Result = make([]*m.MaintenanceActivityDTO, 0)
	sess := x.Table("maintenance_activity")
	sess.Where("maintenance_activity.org_id=?", query.OrgId)
	sess.Cols("maintenance_activity.id","maintenance_activity.org_id","maintenance_activity.message","maintenance_activity.name","maintenance_activity.updated")

	err := sess.Find(&query.Result)
	return err
}
