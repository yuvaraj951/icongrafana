package models

import "time"

type MaintenanceActivity struct {
  Id           int64
  Name         string
  Message      string
  Updated       time.Time
  OrgId         int64

}
type MaintenanceActivityDTO struct {
  OrgId         int64   `json:"orgId"`
  Id       int64             `json:"id"`
  Name      string       `json:"name"`
  Message   string     `json:"message"`
  Updated      time.Time    `json:"updated"`
}

type AddMaintenanceActivity struct {
  OrgId         int64   `json:"orgId"`
  Id       int64             `json:"id"`
  Name      string       `json:"name"`
  Message   string     `json:"message"`
  Updated      time.Time    `json:"updated"`

}
type DeleteMaintenanceActivity struct {
  OrgId int64
  Id int64
}
