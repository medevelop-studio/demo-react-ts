import { action } from "typesafe-actions";
import { actionTypes } from "./types";

const handleRequest = (data) => action(actionTypes.HANDLE_REQUEST, data);
const handleSuccess = (data) => action(actionTypes.HANDLE_SUCCESS, data);
const handleError = (data) => action(actionTypes.HANDLE_ERROR, data);
const handleReset = () => action(actionTypes.HANDLE_RESET);

export default {
  handleRequest,
  handleSuccess,
  handleError,
  handleReset
};
