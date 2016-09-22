package api

import (
	m "github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/middleware"

	"github.com/grafana/grafana/pkg/log"

	//"github.com/grafana/grafana/pkg/api/dtos"
)


func GetMaintenanceActivityHelper(OrgId int64) Response {
	query :=m.GetMaintenanceActivity{OrgId:OrgId}
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get Maintenance Activities", err)
	}

	return Json(200, query.Result)

}
// GET /api/org/machine
func GetMaintenanceActivitesForCurrentOrg(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("Get Maintenance Alerts123",c.OrgId)

	return GetMaintenanceActivityHelper(c.OrgId)
}

