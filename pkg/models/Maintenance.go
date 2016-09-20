package models

import (



)
type Maintenance struct {
  Id           int64

  Component       string
  Parameter       string
  Message     string
  Interval        string
  Org        int64

}

// ----------------------
// QUERIES

type GetMaintenanceQuery struct {
  Org    int64
  Result []*MaintenanceDTO
}

// ----------------------
// Projections and DTOs

type MaintenanceDTO struct {
  Org         int64   `json:"org"`
  Id       int64             `json:"id"`
  Component   string     `json:"componentName"`
  Parameter      string    `json:"parameter"`
  Message        string    `json:"message"`
  Interval         string   `json:"interval"`


}

type MaintenanceUser struct {


  Org           int64
  Id       int64
  Component       string
  Parameter       string
  Message     string
  Interval        string

}
// ---------------------
// COMMANDS
type AddMaintenanceCommand struct {
  Org    int64            `json:"-"`
  Component    string     `json:"component"`
  Parameter     string    `json:"parameter"`
  Message        string    `json:"message"`
  Interval         string   `json:"interval"`
}
type DeleteMaintenanceCommand struct {
  Org int64
  Id int64
}

type GetMaintenanceByIdQuery struct {
  Id     int64
  Result *Maintenance
}

type UpdateMaintenanceCommand struct {

  Id       int64   `json:"-"`
  Component    string     `json:"component"`
  Parameter     string    `json:"parameter"`
  Message        string    `json:"message"`
  Interval         string   `json:"interval"`
}
type MaintenanceDetailsDTO struct {

  Id       int64             `json:"id"`
  Component   string     `json:"componentName"`
  Parameter      string    `json:"parameter"`
  Message        string    `json:"message"`
  Interval         string   `json:"interval"`


}
