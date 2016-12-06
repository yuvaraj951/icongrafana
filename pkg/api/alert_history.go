package api

import (
	m "github.com/grafana/grafana/pkg/models"
	"github.com/grafana/grafana/pkg/bus"
	"github.com/grafana/grafana/pkg/middleware"

	"github.com/grafana/grafana/pkg/log"

	//"github.com/grafana/grafana/pkg/api/dtos"
	"github.com/grafana/grafana/pkg/api/dtos"
)

func GetAlertHistoryHelper(OrgId int64) Response {

	query :=m.GetPendingAlertHistory{OrgId:OrgId}
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get Alerts", err)
	}

	return Json(200, query.Result)

}
func GetPendingAlertHistory(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("Get Maintenance Alerts123",c.OrgId)

	return GetAlertHistoryHelper(c.OrgId)
}

// GET /api/org/machine
func GetCompletedAlertHistory(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("Get Maintenance Alerts123",c.OrgId)

	return GetCompletedAlertHistoryHelper(c.OrgId)
}

func GetCompletedAlertHistoryHelper(OrgId int64) Response {

	query :=m.GetCompletedAlertHistory{OrgId:OrgId}
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get Alerts", err)
	}

	return Json(200, query.Result)

}
// GET /api/org/machine


func UpdateAlertAction(c *middleware.Context, form dtos.UpdateAlertActionForm) Response {

	alertId := c.ParamsInt64(":id")
	form.Name=c.Name
	return UpdateAlertActionHelper( alertId,form)
}

func UpdateAlertActionHelper(alertId int64,form dtos.UpdateAlertActionForm) Response {
	logger := log.New("main")
	logger.Info("updatedProcess1 %s")
	cmd := m.UpdateAlertActionCommand{Id:alertId,AlertMessage: form.AlertMessage, Status: form.Status,Name:form.Name,Message:form.Message,Updated:form.Updated,AlertType:form.AlertType}

	logger.Info("updatedProcess2 %s")
	if err := bus.Dispatch(&cmd); err != nil {
		if err == m.ErrOrgNameTaken {
			return ApiError(400, "Alert name taken", err)
		}
		return ApiError(500, "Failed to Alerts", err)
	}

	return ApiSuccess("Successfully updated the alerts ")
}

func GetPendingAlertActionHistory(c *middleware.Context) Response {
	logger := log.New("main")
	logger.Info("GetMachine123 %s")
	alertId:=c.ParamsInt64(":id")

	return GetPendingAlertActionHistoryHelper(alertId)
}
func GetPendingAlertActionHistoryHelper(alertId int64) Response {
	query := m.GetPendingAlertActionHistory{Id:alertId}
	logger := log.New("main")
	logger.Info("GetMachine1234 %s")
	if err := bus.Dispatch(&query); err != nil {
		return ApiError(500, "Failed to get alerts", err)
	}
	alertAction := query.Result
	result := m.AlertHistoryDTO{
		Id:   alertAction.Id,
		AlertMessage: alertAction.AlertMessage,
		AlertType:alertAction.AlertType,
		Name:alertAction.Name,
		Interval:alertAction.Interval,
	}
	return Json(200, &result)
}






