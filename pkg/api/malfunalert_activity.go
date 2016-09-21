package api

import (
  m "github.com/grafana/grafana/pkg/models"
  "github.com/grafana/grafana/pkg/bus"
  "github.com/grafana/grafana/pkg/middleware"

  "github.com/grafana/grafana/pkg/log"

)

func addMaintenanceAlertHelper(cmd m.AddMalfunalertActivity) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg111",cmd.OrgId)
  query:=m.AddMalfunalertActivity{}

  query.OrgId=cmd.OrgId
  query.Name=cmd.Name
  query.Message=cmd.Message



  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Could not add process to organization", err)
  }


  return ApiSuccess("Process Sucessfully added ")

}

// POST /api/process
func AddMaintenanceAlertToCurrentOrg(c *middleware.Context, cmd m.AddMalfunalertActivity) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg",cmd.OrgId)
  cmd.OrgId = c.OrgId

  return addMaintenanceAlertHelper(cmd)
}

func RemoveMaintenanceUpdateCurrentOrg(c *middleware.Context) Response {
  Id := c.ParamsInt64(":id")
  return removeOrgMaintenanceUpdateHelper(c.OrgId, Id)
}
func removeOrgMaintenanceUpdateHelper(orgId int64, Id int64) Response {
  logger := log.New("main")
  logger.Info("GetProcess123 %s",orgId)
  cmd := m.DeleteMalfunalertActivity{OrgId: orgId, Id: Id }

  logger.Info("GetProcess456")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrLastOrgAdmin {
      return ApiError(400, "Cannot remove last organization admin", nil)
    }
    return ApiError(500, "Failed to remove user from organization", err)
  }

  return ApiSuccess("User removed from organization")
}
