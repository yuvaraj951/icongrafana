package api

import (
  m "github.com/grafana/grafana/pkg/models"
  "github.com/grafana/grafana/pkg/bus"
  "github.com/grafana/grafana/pkg/middleware"

  "github.com/grafana/grafana/pkg/log"

  //"github.com/grafana/grafana/pkg/api/dtos"
  "github.com/grafana/grafana/pkg/api/dtos"
)

// Get Sub Process
func GetSubProcessForCurrentOrg(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("GetProcessForCurrentOrg12",c.OrgId)

  return getSubProcessHelper(c.OrgId)
}

func getSubProcessHelper(OrgId int64) Response {

  query :=m.GetSubProcessQuery{OrgId:OrgId}
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Sub Process", err)
  }

  return Json(200, query.Result)

}

//Add Sub Process

func AddSubProcessToCurrentOrg(c *middleware.Context, cmd m.AddSubProcessCommand) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg",c.OrgId)
  cmd.OrgId = c.OrgId

  return addSubProcessHelper(cmd)
}

func addSubProcessHelper(cmd m.AddSubProcessCommand) Response {

  logger := log.New("main")
  logger.Info("Add ProcessForCurrentOrg111",cmd.OrgId)
  query:=m.AddSubProcessCommand{}

  query.OrgId=cmd.OrgId
  query.SubProcessName=cmd.SubProcessName
  query.ProcessName=cmd.ProcessName
  query.UpdatedBy=cmd.UpdatedBy

  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Could not add Sub process to organization", err)
  }


  return ApiSuccess("Sub Process Sucessfully added ")

}

// Delete the Sub process
func RemoveSubProcessCurrentOrg(c *middleware.Context) Response {
  subprocessId := c.ParamsInt64(":subProcessId")
  logger := log.New("main")
  logger.Info("Delete Process 1 %s")
  return removeOrgSubProcessHelper(c.OrgId, subprocessId)
}
func removeOrgSubProcessHelper(orgId int64, subprocessId int64) Response {
  logger := log.New("main")
  logger.Info("Delete Process 2 %s")
  cmd := m.DeleteSubProcessCommand{OrgId: orgId, SubProcessId: subprocessId}

  logger.Info("GetProcess456")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrLastOrgAdmin {
      return ApiError(400, "Cannot remove last organization admin", nil)
    }
    return ApiError(500, "Failed to remove sub Process from organization", err)
  }

  return ApiSuccess("Sub Process removed from organization")
}

//update the sub Process
func UpdateSubProcess(c *middleware.Context, form dtos.UpdateSubProcessForm) Response {

  subProcessId := c.ParamsInt64(":subProcessId")
  return updateSubProcessHelper( subProcessId,form)
}

func updateSubProcessHelper(subProcessId int64,form dtos.UpdateSubProcessForm) Response {
  logger := log.New("main")
  logger.Info("updatedProcess1 %s")
  cmd := m.UpdateSubProcessCommand{SubProcessId:subProcessId, ProcessName:form.ProcessName,SubProcessName: form.SubProcessName, UpdatedBy:form.UpdatedBy}

  logger.Info("updatedProcess2 %s")
  if err := bus.Dispatch(&cmd); err != nil {
    if err == m.ErrOrgNameTaken {
      return ApiError(400, "Organization name taken", err)
    }
    return ApiError(500, "Failed to update Sub Process ", err)
  }

  return ApiSuccess("Sub Process updated")
}


func GetSubProcessById(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("GetProcess123 %s")
  subprocessId:=c.ParamsInt64(":subProcessId")
  logger.Info("GetProcess123 %s",subprocessId)
  return getSubProcessUserProfile(subprocessId)
}
func getSubProcessUserProfile(subprocessId int64) Response {
  query := m.GetSubProcessByIdQuery{SubProcessId:subprocessId}
  logger := log.New("main")
  logger.Info("GetProcess456 %s")
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Sub Process", err)
  }
  subprocess := query.Result
  result := m.SubProcessDetailDTO{
    SubProcessId:   subprocess.SubProcessId,
    SubProcessName:subprocess.SubProcessName,
    ProcessName: subprocess.ProcessName,
    UpdatedBy:subprocess.UpdatedBy,
  }
  return Json(200, &result)
}

func GetSubProcessByName(c *middleware.Context) Response {
  logger := log.New("main")
  logger.Info("Get Sub Process1 %s")
  processName:=c.Params(":processName")
  logger.Info("Get Sub Process 2 %s",processName)
  return getSubProcessProfile(processName)
}
/*
func getSubProcessProfile(processName string) Response {
  query := m.GetSubProcessByMainProcessQuery{ProcessName:processName}
  logger := log.New("main")
  logger.Info("Get Sub Process3 %s")
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Sub Process", err)
  }
  subprocess := query.Result
  result := m.SubProcessDetailDTO{
    SubProcessId:   subprocess.SubProcessId,
    SubProcessName:subprocess.SubProcessName,
    ProcessName: subprocess.ProcessName,
    UpdatedBy:subprocess.UpdatedBy,
  }
  return Json(200, &result)
}
*/
func getSubProcessProfile(processName string) Response {

  query :=m.GetSubProcessByMainProcessQuery{ProcessName:processName}
  if err := bus.Dispatch(&query); err != nil {
    return ApiError(500, "Failed to get Sub Process", err)
  }

  return Json(200, query.Result)

}
