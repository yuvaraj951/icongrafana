package models

import "time"

type MalfunalertHistory struct {
  Id           int64
  Message      string
  Sended       time.Time
  Interval     string
  Org          int64
  Status       string
}

type GetMalfunalertHistoryQuery struct {
  Org    int64
  Result []*MalfunalertHistoryDTO
}

type MalfunalertHistoryDTO struct {
  Org         int64   `json:"org"`
  Id       int64             `json:"id"`
  Message   string     `json:"message"`
  Sended      string    `json:"sended"`
  Interval         string   `json:"interval"`
  Status       string      `json:"status"`

}
type MalfunalertHistoryUser struct {


  Id           int64
  Message      string
  Sended       time.Time
  Interval     string
  Org          int64

}
type GetMalfunalertHistoryByIntervalQuery struct {

  Interval     string
  Result []*MalfunalertHistoryDTO
}
type UpdateMalfunalertHistory struct {
  Id     int64
  Org     int64
  Status string
}

