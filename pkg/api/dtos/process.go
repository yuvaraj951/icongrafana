package dtos

import "time"

type AddProcessForm struct {
  ProcessName         string     `json:"processName"`
  ParentProcessName     string     `json:"parentProcessName" binding:"Required"`
  UpdatedBy   string       `json:"updatedBy"`
}

type UpdateProcessForm struct {

  ProcessId        int64       `json:"processId" `
  ProcessName         string     `json:"processName" binding:"Required"`
  UpdatedBy   string       `json:"updatedBy"`
}
type UpdateSubProcessForm struct {

  SubProcessId       int64   `json:"subProcessId"`
  ProcessName         string     `json:"processName" binding:"Required"`
  SubProcessName     string    `json:"subProcessName"`
  UpdatedBy       string      `json:"updatedBy"`
}
type UpdateMachineForm struct {

  MachineId       int64   `json:"machineId"`
  MachineName     string    `json:"machineName" binding:"Required"`
  Description string     `json:"description" `
  UpdatedBy       string      `json:"updatedBy" `
  Vendor          string     `json:"vendor" `
}
type UpdateMaintenanceForm struct {

  Id       int64             `json:"id"`
  Component   string     `json:"component"`
  Parameter      string    `json:"parameter"`
  Message        string    `json:"message"`
  Interval         string   `json:"interval"`
}
type UpdateAlertActionForm struct {
  Id           int64             `json:"id"`
  OrgId        int64   `json:"orgId"`
  AlertMessage string     `json:"alertMessage"`
  Sended       string    `json:"sended"`
  Interval     string   `json:"interval"`
  Status       string      `json:"status"`
  Name         string      `json:"name"`
  Message      string        `json:"message"`
  Updated      time.Time       `json:"updated"`
  AlertType    string          `json:"alertType"`

}
