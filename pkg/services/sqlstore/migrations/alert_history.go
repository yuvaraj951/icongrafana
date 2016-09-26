package migrations

import  ."github.com/grafana/grafana/pkg/services/sqlstore/migrator"

func addAlertHistoryeMigrations(mg *Migrator) {

	alert_historyV1 := Table{
		Name: "alert_history",
		Columns: []*Column{
			{Name: "id", Type: DB_BigInt, Length: 20,IsPrimaryKey: true, IsAutoIncrement: true},
			{Name: "org_id", Type: DB_BigInt,Length: 20, Nullable: false},
			{Name: "alert_message", Type: DB_NVarchar, Length: 255, Nullable: false},
			{Name: "sended", Type: DB_DateTime, Nullable: false},
			{Name: "interval", Type: DB_NVarchar,Length: 20, Nullable: true},
			{Name: "status", Type: DB_NVarchar,Length: 20, Nullable: true},
			{Name: "name", Type: DB_NVarchar, Length: 255, Nullable: true},
			{Name: "message", Type: DB_NVarchar, Length: 255, Nullable: true},
			{Name: "updated", Type: DB_DateTime, Nullable: true},
			{Name: "alert_type", Type: DB_NVarchar,Length: 20, Nullable: true},
		},
		Indices: []*Index{
			{Cols: []string{"id"}, Type: IndexType},
			{Cols: []string{"org_id"}, Type: IndexType},
			{Cols: []string{"alert_message"}, Type: IndexType},
			{Cols: []string{"interval"}, Type: IndexType},
			{Cols: []string{"status"}, Type: IndexType},
			{Cols: []string{"name"}, Type: IndexType},
			{Cols: []string{"message"}, Type: IndexType},
			{Cols: []string{"alert_type"}, Type: IndexType},

		},

	}
	mg.AddMigration("create alert_history  table v1-7", NewAddTableMigration(alert_historyV1))
	addTableIndicesMigrations(mg, "v1-7", alert_historyV1)

}
