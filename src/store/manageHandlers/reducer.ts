import { Reducer } from "redux";
import { actionTypes } from "./types";

export const initialState = {
  handlerStatus: {
    status: "",
    message: ""
  }
};

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HANDLE_REQUEST:
      return {
        handlerStatus: { status: "loading", message: action.payload.message || "Loading message" }
      };
    case actionTypes.HANDLE_SUCCESS:
      return {
        handlerStatus: { status: "success", message: action.payload.message || "Success" }
      };
    case actionTypes.HANDLE_ERROR:
      return {
        handlerStatus: { status: "error", message: action.payload.message || "Error message" }
      };
    case actionTypes.HANDLE_RESET:
      return initialState;
    default: {
      return state;
    }
  }
};

export default reducer;
