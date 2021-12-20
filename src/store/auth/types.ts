export enum actionTypes {
  LOGIN_REQUEST = "@@auth/LOGIN_REQUEST",
  AUTH_SUCCESS = "@@auth/AUTH_SUCCESS",
  PROFILE_REQUEST = "@@auth/PROFILE_REQUEST",
  PROFILE_ERROR = "@@auth/PROFILE_ERROR",
  PROFILE_LOGOUT = "@@auth/PROFILE_LOGOUT",
  USER_EDIT = "@@auth/USER_EDIT",

  // Balance
  BALANCE_HISTORY_REQUEST = "@@auth/BALANCE_HISTORY_REQUEST",
  BALANCE_HISTORY_SUCCESS = "@@auth/BALANCE_HISTORY_SUCCESS",

  // Balance
  TICKET_HISTORY_REQUEST = "@@auth/TICKET_HISTORY_REQUEST",
  TICKET_HISTORY_SUCCESS = "@@auth/TICKET_HISTORY_SUCCESS"
}

export interface User {
  id: number;
  email: string;
  permissionLevel: number;
  name: string;
  balance: number;
  parent: number | null;
  createTime: string;
  status: number;
}

export interface AuthState {
  user: User;
  isAuthenticated: boolean;
  isLoaded: boolean;
  authFailure: boolean;
  loginStatus: boolean;
}
