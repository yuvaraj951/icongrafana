package api

import (
  m "github.com/grafana/grafana/pkg/models"
  "github.com/grafana/grafana/pkg/bus"
  "github.com/grafana/grafana/pkg/middleware"

  "github.com/grafana/grafana/pkg/log"

  //"github.com/grafana/grafana/pkg/api/dtos"
)

func GetMaintenanceAlertsHelper(OrgId int64) Response {

  query :=m.GetMalfunalertHistoryQuery{Org:OrgId}
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Maintenance Alerts", err)
  }

  return Json(200, query.Result)

}
// GET /api/org/machine
func GetMaintenanceUpdateForCurrentOrg(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("Get Maintenance Alerts",c.OrgId)

  return GetMaintenanceAlertsHelper(c.OrgId)
}

func GetMaintenanceAlertsByInterval(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("Get Maintenance Alerts 1 %s")
  interval:=c.Params(":interval")
  logger.Info("Get Maintenance Alerts 1 %s",interval)
  return GetMaintenanceAlerts(interval)
}
func GetMaintenanceAlerts(interval string) Response {

  query :=m.GetMalfunalertHistoryByIntervalQuery{Interval:interval}
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Maintenance Alerts", err)
  }

  return Json(200, query.Result)

}
func UpdateMaintenanceCurrentOrg(c *middleware.Context) Response {
  Id := c.ParamsInt64(":id")
  return UpdateOrgMaintenanceHelper(c.OrgId, Id)
}
func UpdateOrgMaintenanceHelper(orgId int64, Id int64) Response {
  logger := log.New("main")
  logger.Info("GetProcess123 %s",orgId)
  cmd := m.UpdateMalfunalertHistory{Org: orgId, Id: Id }

  logger.Info("GetProcess456")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrLastOrgAdmin {
      return ApiError(400, "Cannot remove last organization admin", nil)
    }
    return ApiError(500, "Failed to update the  Maintenance Alerts", err)
  }

  return ApiSuccess("")
}
