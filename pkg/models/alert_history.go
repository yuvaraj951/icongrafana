package models

import "time"

type AlertHistory struct {
	Id               int64
	OrgId            int64
	AlertMessage     string
	Sended           time.Time
	Interval         string
	Status           string
	Name             string
	Message          string
	Updated          time.Time
	AlertType      string
}

type AlertHistoryDTO struct {
	Id           int64             `json:"id"`
	OrgId        int64   `json:"orgId"`
	AlertMessage string     `json:"alertMessage"`
	Sended       string    `json:"sended"`
	Interval     string   `json:"interval"`
	Status       string      `json:"status"`
	Name         string      `json:"name"`
	Message      string        `json:"Message"`
	Updated      time.Time       `json:"updated"`
	AlertType  string          `json:"alertType"`

}
type GetAlertHistoryQuery struct {
	OrgId    int64
	Result []*AlertHistoryDTO
}
