/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { Role } from "./globalTypes";

// ====================================================
// GraphQL query operation: meQuery
// ====================================================

export interface meQuery_me {
  __typename: "Account";
  email: string;
  role: Role;
  verified: boolean;
}

export interface meQuery {
  me: meQuery_me;
}
