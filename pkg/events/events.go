package events

import (
	"reflect"
	"time"
)

// Events can be passed to external systems via for example AMQP
// Treat these events as basically DTOs so changes has to be backward compatible

type Priority string

const (
	PRIO_DEBUG Priority = "DEBUG"
	PRIO_INFO  Priority = "INFO"
	PRIO_ERROR Priority = "ERROR"
)

type Event struct {
	Timestamp time.Time `json:"timestamp"`
}

type OnTheWireEvent struct {
	EventType string      `json:"event_type"`
	Priority  Priority    `json:"priority"`
	Timestamp time.Time   `json:"timestamp"`
	Payload   interface{} `json:"payload"`
}

type EventBase interface {
	ToOnWriteEvent() *OnTheWireEvent
}

func ToOnWriteEvent(event interface{}) (*OnTheWireEvent, error) {
	eventType := reflect.TypeOf(event).Elem()

	wireEvent := OnTheWireEvent{
		Priority:  PRIO_INFO,
		EventType: eventType.Name(),
		Payload:   event,
	}

	baseField := reflect.Indirect(reflect.ValueOf(event)).FieldByName("Timestamp")
	if baseField.IsValid() {
		wireEvent.Timestamp = baseField.Interface().(time.Time)
	} else {
		wireEvent.Timestamp = time.Now()
	}

	return &wireEvent, nil
}

type OrgCreated struct {
	Timestamp time.Time `json:"timestamp"`
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
}

type OrgUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
}

type UserCreated struct {
	Timestamp time.Time `json:"timestamp"`
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
	Login     string    `json:"login"`
	Email     string    `json:"email"`
	Mobile    string    `json:"mobile"`
	Company   string    `json:"company"`
}

type SignUpStarted struct {
	Timestamp time.Time `json:"timestamp"`
	Email     string    `json:"email"`
	Code      string    `json:"code"`
}

type SignUpCompleted struct {
	Timestamp time.Time `json:"timestamp"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
}

type UserUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	Id        int64     `json:"id"`
	Name      string    `json:"name"`
	Login     string    `json:"login"`
	Email     string    `json:"email"`
	Mobile    string    `json:"mobile"`
}
type ProcessUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	OrgId    int64            `json:"orgId"`
	ProcessId       int64   `json:"processId"`
	ProcessName     string    `json:"processName"`
	UpdatedBy       string      `json:"updatedBy"`

}
type SubProcessUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	OrgId    int64            `json:"orgId"`
	SubProcessId       int64   `json:"subProcessId"`
	SubProcessName     string    `json:"subProcessName"`
	ProcessName     string    `json:"processName"`
	UpdatedBy       string      `json:"updatedBy"`

}
type MachineUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	OrgId    int64            `json:"orgId"`
	MachineId       int64   `json:"machineId"`
	MachineName     string    `json:"machineName" binding:"Required"`
	Description string     `json:"description" `
	UpdatedBy       string      `json:"updatedBy" `
	Vendor          string     `json:"vendor" `

}
type MaintenanceUpdated struct {
	Timestamp time.Time `json:"timestamp"`
	Org    int64            `json:"org"`
	Id       int64           `json:"id"`
	Component   string     `json:"componentName"`
	Parameter      string    `json:"parameter"`
	Message        string    `json:"message"`
	Interval         string   `json:"interval"`

}
type AlertActionUpdate struct {
	Timestamp time.Time `json:"timestamp"`
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
