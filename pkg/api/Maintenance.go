package api

import (
  m "github.com/grafana/grafana/pkg/models"
  "github.com/grafana/grafana/pkg/bus"
  "github.com/grafana/grafana/pkg/middleware"

  "github.com/grafana/grafana/pkg/log"

  "github.com/grafana/grafana/pkg/api/dtos"
)
// get machines
func getMaintenanceHelper(OrgId int64) Response {

  query :=m.GetMaintenanceQuery{Org:OrgId}
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Machines", err)
  }

  return Json(200, query.Result)

}
// GET /api/org/machine
func GetMaintenanceForCurrentOrg(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("GetProcessForCurrentOrg12",c.OrgId)

  return getMaintenanceHelper(c.OrgId)
}

// add a machine
func addMaintenanceHelper(cmd m.AddMaintenanceCommand) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg111",cmd.Org)
  query:=m.AddMaintenanceCommand{}

  query.Org=cmd.Org
  query.Component=cmd.Component
  query.Parameter=cmd.Parameter
  query.Message=cmd.Message
  query.Interval=cmd.Interval


  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Could not add process to organization", err)
  }


  return ApiSuccess("Process Sucessfully added ")

}

// POST /api/process
func AddMaintenanceToCurrentOrg(c *middleware.Context, cmd m.AddMaintenanceCommand) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg",cmd.Org)
  cmd.Org = c.OrgId

  return addMaintenanceHelper(cmd)
}


//remove the machine
func RemoveMaintenanceCurrentOrg(c *middleware.Context) Response {
  Id := c.ParamsInt64(":Id")
  return removeOrgMaintenanceHelper(c.OrgId, Id)
}
func removeOrgMaintenanceHelper(orgId int64, Id int64) Response {
  logger := log.New("main")
  logger.Info("GetProcess123 %s",orgId)
  cmd := m.DeleteMaintenanceCommand{Org: orgId, Id: Id }

  logger.Info("GetProcess456")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrLastOrgAdmin {
      return ApiError(400, "Cannot remove last organization admin", nil)
    }
    return ApiError(500, "Failed to remove user from organization", err)
  }

  return ApiSuccess("User removed from organization")
}


func UpdateMaintenance(c *middleware.Context, form dtos.UpdateMaintenanceForm) Response {

  maintenanceId := c.ParamsInt64(":Id")
  return updateMaintenanceHelper( maintenanceId,form)
}

func updateMaintenanceHelper(maintenanceId int64,form dtos.UpdateMaintenanceForm) Response {
  logger := log.New("main")
  logger.Info("updatedProcess1 %s")
  cmd := m.UpdateMaintenanceCommand{Id:maintenanceId,Component: form.Component, Parameter: form.Parameter,Message:form.Message,Interval:form.Interval}

  logger.Info("updatedProcess2 %s")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrOrgNameTaken {
      return ApiError(400, "Organization name taken", err)
    }
    return ApiError(500, "Failed to update organization", err)
  }

  return ApiSuccess("Organization updated")
}

func GetMaintenacneById(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("GetMachine123 %s")
  Id:=c.ParamsInt64(":Id")

  return getMaintenanceUserProfile(Id)
}
func getMaintenanceUserProfile(Id int64) Response {
  query := m.GetMaintenanceByIdQuery{Id:Id}
  logger := log.New("main")
  logger.Info("GetMachine1234 %s")
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get user", err)
  }
  maintenance := query.Result
  result := m.MaintenanceDetailsDTO{
    Id:   maintenance.Id,
    Component: maintenance.Component,
    Parameter:maintenance.Parameter,
    Message:maintenance.Message,
    Interval:maintenance.Interval,
  }
  return Json(200, &result)
}
