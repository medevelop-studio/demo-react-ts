import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { IntlReducer as Intl } from "react-redux-multilingual";

import setAuthorizationHeader from "./setAuthorizationHeader";
import authSaga from "./auth/sagas";
import authReducer from "./auth/reducer";
import { AuthState } from "./auth/types";

import manageUsersSaga from "./manageUsers/sagas";
import manageUsersReducer from "./manageUsers/reducer";

import evoGamesSaga from "./evoGames/sagas";
import evoGamesReducer from "./evoGames/reducer";

import tvBetSaga from "./tvBet/sagas";
import tvBetReducer from "./tvBet/reducer";

import slotsSaga from "./slots/sagas";
import slotsReducer from "./slots/reducer";

import nuxSlotsSaga from "./nuxslots/sagas";
import nuxSlotsReducer from "./nuxslots/reducer";

import manageHandlersReducer from "./manageHandlers/reducer";
import manageHandlersSaga from "./manageHandlers/sagas";

import rulesSaga from "./rules/sagas";
import rulesReducer from "./rules/reducer";

import gamesTypesSaga from "./gamesTypes/sagas";
import gamesTypesReducer from "./gamesTypes/reducer";

export interface ApplicationState {
  auth: AuthState;
}

export const initialState = () => {
  return {
    Intl: {
      locale: localStorage.locale || "en"
    }
  };
};

const appReducer = combineReducers({
  auth: authReducer,
  manageUsers: manageUsersReducer,
  evoGames: evoGamesReducer,
  tvBet: tvBetReducer,
  slots: slotsReducer,
  nuxslots: nuxSlotsReducer,
  rules: rulesReducer,
  manageHandlers: manageHandlersReducer,
  gamesTypes: gamesTypesReducer,
  Intl
});

export const rootReducer = (state, action) => {
  if (action.type === "@@auth/PROFILE_LOGOUT") {
    localStorage.removeItem("ACCESS_TOKEN");
    setAuthorizationHeader(null);
    state = initialState();
  }

  return appReducer(state, action);
};

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(manageUsersSaga),
    fork(evoGamesSaga),
    fork(tvBetSaga),
    fork(slotsSaga),
    fork(nuxSlotsSaga),
    fork(manageHandlersSaga),
    fork(rulesSaga),
    fork(gamesTypesSaga),
  ]);
}
