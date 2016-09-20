package migrations

import  ."github.com/grafana/grafana/pkg/services/sqlstore/migrator"

func addSubProcessMigrations(mg *Migrator) {


    subprocessV1 := Table{
    Name: "sub_process",
    Columns: []*Column{
    {Name: "sub_process_id", Type: DB_BigInt, Length: 20, IsPrimaryKey: true, IsAutoIncrement: true, Nullable: true},
    {Name: "sub_process_name", Type: DB_NVarchar, Length: 255, Nullable: true},
    {Name: "process_name", Type: DB_NVarchar, Length: 255, Nullable: true},
    {Name: "org_id", Type: DB_BigInt, Length: 20, Nullable: true},
    {Name: "created", Type: DB_DateTime, Nullable: false},
    {Name: "updated", Type: DB_DateTime, Nullable: false},
    {Name: "updated_by", Type: DB_NVarchar, Length: 45, Nullable: true},
    },
    Indices: []*Index{
    {Cols: []string{"sub_process_id"}, Type: IndexType},
    {Cols: []string{"org_id"}, Type: IndexType},
    {Cols: []string{"updated_by"}, Type: IndexType},
      {Cols: []string{"process_name"}, Type: IndexType},
    },
  }
  mg.AddMigration("create sub process  table v1-7", NewAddTableMigration(subprocessV1))
  addTableIndicesMigrations(mg, "v1-7", subprocessV1)


  }
