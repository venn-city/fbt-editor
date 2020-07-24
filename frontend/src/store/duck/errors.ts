import { ApiError } from "../../utils/errorTypes";

export const ADD_LAST_ERROR = "errors/ADD_LAST_ERROR";
export const CLEAR_LAST_ERROR = "errors/CLEAR_LAST_ERROR";

export interface ErrorsState {
  lastError: ApiError;
}

export interface ErrorsAction {
  type: string;
  error: ApiError;
}

const INITIAL_STATE: ErrorsState = {
  lastError: {} as ApiError,
};

export const addLastError = (error: ApiError) => ({
  type: ADD_LAST_ERROR,
  error,
});
export const clearLastError = () => ({ type: CLEAR_LAST_ERROR });

export const errorsReducer = (
  state: ErrorsState = INITIAL_STATE,
  action: ErrorsAction
): ErrorsState => {
  switch (action.type) {
    case ADD_LAST_ERROR:
      return {
        ...state,
        lastError: action.error,
      };
    case CLEAR_LAST_ERROR:
      return { ...state, lastError: {} as ApiError };
    default:
      return state;
  }
};

export const getErrors = (state: { errors: ErrorsState }): ErrorsState =>
  state.errors;
export const getLastError = (state: { errors: ErrorsState }): ApiError =>
  getErrors(state).lastError;
