package models

import "time"

type MaintenanceHistory struct {
  Id           int64
  Message      string
  Sended       time.Time
  Interval     string
  Org          int64
  Status       string
}

type GetMaintenanceHistoryQuery struct {
  Org    int64
  Result []*MaintenanceHistoryDTO
}

type MaintenanceHistoryDTO struct {
  Org         int64   `json:"org"`
  Id       int64             `json:"id"`
  Message   string     `json:"message"`
  Sended      string    `json:"sended"`
  Interval         string   `json:"interval"`
  Status       string      `json:"status"`

}
type MaintenanceHistoryUser struct {


  Id           int64
  Message      string
  Sended       time.Time
  Interval     string
  Org          int64

}
type GetMaintenanceHistoryByIntervalQuery struct {

  Interval     string
  Result []*MaintenanceHistoryDTO
}
type UpdateMaintenanceHistory struct {
  Id     int64
  Org     int64
  Status string
}

