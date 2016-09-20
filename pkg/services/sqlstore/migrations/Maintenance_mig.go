package migrations

import  ."github.com/grafana/grafana/pkg/services/sqlstore/migrator"

func addMaintenanceMigrations(mg *Migrator)  {

  maintenanceV1:= Table{
    Name: "maintenance",
    Columns: []*Column{
      {Name: "Id", Type: DB_BigInt, IsPrimaryKey: true, IsAutoIncrement: true},
      {Name: "Org", Type: DB_BigInt,  Nullable: false},
      {Name: "Component", Type: DB_NVarchar, Length: 20, Nullable: false},
      {Name: "Parameter", Type: DB_NVarchar, Length: 20,  Nullable: false},
      {Name: "Message", Type: DB_NVarchar, Length: 255, Nullable: false},
      {Name: "Interval", Type: DB_NVarchar, Length: 20,  Nullable: false},

    },
    Indices: []*Index{
      {Cols: []string{"Id"}, Type: IndexType},
      {Cols: []string{"Org"}, Type: IndexType},
      {Cols: []string{"Component"}, Type: IndexType},
      {Cols: []string{"Message"}, Type: IndexType},

    },

  }
  mg.AddMigration("create process  table v1-7", NewAddTableMigration(maintenanceV1))
  addTableIndicesMigrations(mg, "v1-7", maintenanceV1)



}
