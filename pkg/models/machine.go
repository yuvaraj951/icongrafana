package models

import (
  "time"


)
type Machine struct {
  OrgId           int64
  MachineId       int64
  ProcessId       int64
  MachineName     string
  Description     string
  Created         time.Time
  Updated         time.Time
  UpdatedBy       string
  Vendor          string
}

// ----------------------
// QUERIES

type GetMachineQuery struct {
  OrgId    int64
  Result []*MachineDTO
}

// ----------------------
// Projections and DTOs

type MachineDTO struct {
  OrgId           int64   `json:"orgId"`
  MachineId       int64   `json:"machineId"`
  MachineName     string    `json:"machineName"`
  ProcessId       string     `json:"processId"`
  Description     string    `json:"description"`
  Created         time.Time   `json:"created"`
  Updated         time.Time   `json:"updated"`
  UpdatedBy       string      `json:"updatedBy"`
  Vendor           string      `json:"vendor"`
}

type MachineUser struct {


  MachineId      int64

  MachineName     string
  Description     string
  UpdatedBy       string
  Vendor          string
}
// ---------------------
// COMMANDS
type AddMachineCommand struct {
  OrgId    int64            `json:"-"`
  ProcessId  int64           `json:"-"`
  MachineName     string    `json:"machineName" binding:"Required"`
  Description string     `json:"description" `
  UpdatedBy       string      `json:"updatedBy" `
  Vendor          string     `json:"vendor" `

}
type DeleteMachineCommand struct {
  OrgId int64
  MachineId int64
}

type UpdateMachineCommand struct {

  MachineId       int64   `json:"-"`
  MachineName     string    `json:"machineName" binding:"Required"`
  Description string     `json:"description" `
  UpdatedBy       string      `json:"updatedBy" `
  Vendor          string     `json:"vendor" `
}

type GetMachineByCodeQuery struct {
  MachineId int64

  Result *MachineDTO
}
type GetMachineByIdQuery struct {

  MachineId     int64
  Result *Machine
}

type MachineDetailsDTO struct {

  MachineId       int64   `json:"machineId"`
  MachineName     string    `json:"machineName"`
  Description     string    `json:"description"`
  UpdatedBy       string      `json:"updatedBy"`
  Vendor           string      `json:"vendor"`
}
