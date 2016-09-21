package api

import (
	m "github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/middleware"

	"github.com/grafana/grafana/pkg/log"

	//"github.com/grafana/grafana/pkg/api/dtos"
)

func GetMaintenanceHistoryHelper(OrgId int64) Response {

	query :=m.GetMaintenanceHistoryQuery{Org:OrgId}
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get Maintenance Alerts", err)
	}

	return Json(200, query.Result)

}
// GET /api/org/machine
func GetMaintenanceHistoryForCurrentOrg(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("Get Maintenance Alerts123",c.OrgId)

	return GetMaintenanceHistoryHelper(c.OrgId)
}

func GetMaintenanceHistoryByInterval(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("Get Maintenance Alerts 1 %s")
	interval:=c.Params(":interval")
	logger.Info("Get Maintenance Alerts 1 %s",interval)
	return GetMaintenanceHistoryAlerts(interval)
}
func GetMaintenanceHistoryAlerts(interval string) Response {

	query :=m.GetMaintenanceHistoryByIntervalQuery{Interval:interval}
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get Maintenance Alerts", err)
	}

	return Json(200, query.Result)

}
func UpdateMaintenanceHistoryCurrentOrg(c *middleware.Context) Response {
	Id := c.ParamsInt64(":id")
	return UpdateOrgMaintenanceHistoryHelper(c.OrgId, Id)
}
func UpdateOrgMaintenanceHistoryHelper(orgId int64, Id int64) Response {
	logger := log.New("main")
	logger.Info("GetProcess123 %s",orgId)
	cmd := m.UpdateMaintenanceHistory{Org: orgId, Id: Id }

	logger.Info("GetProcess456")
	if err := bus.Dispatch(&cmd); err != nil {
		if err == m.ErrLastOrgAdmin {
			return ApiError(400, "Cannot remove last organization admin", nil)
		}
		return ApiError(500, "Failed to update the  Maintenance Alerts", err)
	}

	return ApiSuccess("")
}
