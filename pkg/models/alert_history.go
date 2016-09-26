package models

import "time"

type AlertStatus string

const (
	AlertsPending AlertStatus = "Pending Alerts"
	AlertsCompleted     AlertStatus = "Completed Alerts"

)

type AlertHistory struct {
	Id               int64
	OrgId            int64
	AlertMessage     string
	Sended           time.Time
	Interval         string
	Status           AlertStatus
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
	Status       AlertStatus      `json:"status"`
	Name         string      `json:"name"`
	Message      string        `json:"Message"`
	Updated      time.Time       `json:"updated"`
	AlertType  string          `json:"alertType"`

}
type GetAlertHistoryQuery struct {
	OrgId    int64
	Result []*AlertHistoryDTO
}
type GetAlertHistoryByStatusQuery struct {
	OrgId    int64
	Status   AlertStatus
	Result []*AlertHistoryDTO
}