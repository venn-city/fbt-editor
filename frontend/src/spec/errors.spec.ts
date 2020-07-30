import deepFreeze from "deep-freeze";
import {
  addLastError,
  ADD_LAST_ERROR,
  clearLastError,
  CLEAR_LAST_ERROR,
  ErrorsAction,
  errorsReducer,
  ErrorsState,
  getErrors,
  getLastError,
} from "../store/duck/errors";
import { ApiError } from "../utils/errorTypes";

const errorsState = {
  lastError: {},
} as ErrorsState;

const state = {
  errors: errorsState,
};

const mockState = {
  lastError: { message: "message", status: 409 } as ApiError,
};

describe("errors actions", () => {
  it("addLastError", () => {
    const { type, error } = addLastError(mockState.lastError);

    expect(type).toBe(ADD_LAST_ERROR);
    expect(error).toBe(mockState.lastError);
  });

  it("clearLastError", () => {
    const { type } = clearLastError();

    expect(type).toBe(CLEAR_LAST_ERROR);
  });
});

describe("errors reducer", () => {
  beforeAll(() => {
    deepFreeze(state);
  });

  describe("when receiving not relative action", () => {
    it("should return default state", () => {
      const newState = errorsReducer(errorsState, {
        type: "RANDOM_NAME",
      } as ErrorsAction);
      expect(newState).toEqual(errorsState);
    });
  });

  describe("should update last error", () => {
    const newState = errorsReducer(errorsState, {
      type: ADD_LAST_ERROR,
      error: mockState.lastError,
    });

    expect(newState.lastError).toEqual(mockState.lastError);
  });

  describe("should clear last error", () => {
    const newState = errorsReducer(errorsState, {
      type: CLEAR_LAST_ERROR,
    } as ErrorsAction);

    expect(newState.lastError).toEqual(errorsState.lastError);
  });
});

describe("selectors", () => {
  describe("getErrors", () => {
    it("should return errors", () => {
      expect(getErrors(state)).toEqual(errorsState);
    });
  });

  describe("getLastError", () => {
    it("should return last error", () => {
      expect(getLastError(state)).toEqual(errorsState.lastError);
    });
  });
});
