/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Role {
  client = "client",
  delivery = "delivery",
  owner = "owner",
}

export interface CreateAccountInputDto {
  name: string;
  email: string;
  role: Role;
  password: string;
}

export interface LoginInputDto {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
