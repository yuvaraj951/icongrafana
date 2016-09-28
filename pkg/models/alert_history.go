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
	Message      string        `json:"message"`
	Updated      time.Time       `json:"updated"`
	AlertType    string          `json:"alertType"`

}
type GetPendingAlertHistory struct {
	OrgId    int64
	Result []*AlertHistoryDTO
}
type GetCompletedAlertHistory struct {
	OrgId    int64
	Result []*AlertHistoryDTO
}
type GetPendingAlertActionHistory struct {
	Id       int64
	Result *AlertHistory
}
type UpdateAlertActionCommand struct {
	Id           int64             `json:"-"`
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
