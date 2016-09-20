package models

import "time"

type MalfunalertActivity struct {
  Id           int64
  Name         string
  Message      string
  Updated       time.Time
  OrgId         int64

}
type MalfunalertActivityDTO struct {
  OrgId         int64   `json:"orgId"`
  Id       int64             `json:"id"`
  Name      string       `json:"name"`
  Message   string     `json:"message"`
  Updated      string    `json:"updated"`
 }

type AddMalfunalertActivity struct {
  OrgId         int64   `json:"orgId"`
  Id       int64             `json:"id"`
  Name      string       `json:"name"`
  Message   string     `json:"message"`
  Updated      string    `json:"updated"`

}
type DeleteMalfunalertActivity struct {
  OrgId int64
  Id int64
}
