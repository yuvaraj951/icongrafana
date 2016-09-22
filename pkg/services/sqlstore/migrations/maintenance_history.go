package migrations

import  ."github.com/grafana/grafana/pkg/services/sqlstore/migrator"

func addMaintenancHistoryTableMigrations(mg *Migrator) {

  maintenance_historyV1 := Table{
    Name: "maintenance_history",
    Columns: []*Column{
      {Name: "id", Type: DB_BigInt, Length: 20,IsPrimaryKey: true, IsAutoIncrement: true},
      {Name: "org", Type: DB_BigInt,Length: 20, Nullable: false},
      {Name: "message", Type: DB_NVarchar, Length: 255, Nullable: false},
      {Name: "sended", Type: DB_DateTime, Nullable: false},
      {Name: "interval", Type: DB_NVarchar,Length: 20, Nullable: false},
      {Name: "status", Type: DB_NVarchar,Length: 20, Nullable: false},

    },
    Indices: []*Index{
      {Cols: []string{"id"}, Type: IndexType},
      {Cols: []string{"org"}, Type: IndexType},
      {Cols: []string{"message"}, Type: IndexType},
      {Cols: []string{"interval"}, Type: IndexType},
      {Cols: []string{"status"}, Type: IndexType},


    },

  }
  mg.AddMigration("create maintenance_history  table v1-7", NewAddTableMigration(maintenance_historyV1))
  addTableIndicesMigrations(mg, "v1-7", maintenance_historyV1)

}

