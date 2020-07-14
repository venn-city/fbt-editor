import { all, put, takeLatest } from 'redux-saga/effects';
import * as API from '../../api';
import { ApiError } from '../../utils/errorTypes';
import { AuthClientData, CurrentUser, LoginUserRequest } from '../entities';
import requestAPI from '../sagas/requestAPI';
import { addLastError } from './errors';

export const LOGIN_USER = 'auth/LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'recentFiles/LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'recentFiles/LOGIN_USER_FAILURE';
export const LOGOUT = 'auth/LOGOUT';
export const FETCH_AUTH_CLIENT_DATA = 'auth/FETCH_AUTH_CLIENT_DATA';
export const FETCH_AUTH_CLIENT_DATA_SUCCESS = 'auth/FETCH_AUTH_CLIENT_DATA_SUCCESS';
export const FETCH_AUTH_CLIENT_DATA_FAILURE = 'auth/FETCH_AUTH_CLIENT_DATA_FAILURE';

export interface UsersState {
  currentUser: CurrentUser|null,
  isLoggedIn: boolean,
  isLoading: boolean,
  error: ApiError|null,
  authClientData: AuthClientData;
}

export interface UsersStateAction {
  loginUserRequest: LoginUserRequest|null,
  currentUser: CurrentUser|null,
  error: ApiError|null,
  type: string;
  authClientData: AuthClientData;
}

const INITIAL_STATE: UsersState = {
  currentUser: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
  authClientData: { clientId: ""} as AuthClientData,
};

export const loginUser = (loginUserRequest: LoginUserRequest):UsersStateAction => ({ type: LOGIN_USER, loginUserRequest } as UsersStateAction);
export const loginUserSucess = (currentUser: CurrentUser|null):UsersStateAction => ({ type: LOGIN_USER_SUCCESS, currentUser } as UsersStateAction);
export const loginUserFailure = (error: ApiError):UsersStateAction => ({ type: LOGIN_USER_FAILURE, error } as UsersStateAction);
export const logout = ():UsersStateAction => ({ type: LOGOUT } as UsersStateAction);
export const fetchAuthClientData = ():UsersStateAction => ({ type: FETCH_AUTH_CLIENT_DATA } as UsersStateAction);
export const fetchAuthClientDataSuccess = (authClientData: AuthClientData):UsersStateAction =>
  ({ type: FETCH_AUTH_CLIENT_DATA_SUCCESS, authClientData } as UsersStateAction);
export const fetchAuthClientDataFailure = (error: ApiError):UsersStateAction => ({ type: FETCH_AUTH_CLIENT_DATA_FAILURE, error } as UsersStateAction);

export const authReducer = (state: UsersState = INITIAL_STATE, action: UsersStateAction ) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.currentUser,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case LOGOUT:
      return {
        ...state,
        currentUser: null,
        isLoggedIn: false,
        isLoading: false,
      };
    case FETCH_AUTH_CLIENT_DATA:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_AUTH_CLIENT_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        authClientData: action.authClientData,
      };
    case FETCH_AUTH_CLIENT_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export const getUsersState = (state: {users: UsersState}): UsersState => state.users;
export const getCurrentUser = (state: {users: UsersState}): CurrentUser|null => getUsersState(state).currentUser;
export const getCurrentUserEmail = (state: {users: UsersState}): string|undefined => getUsersState(state).currentUser?.email;
export const getIsLoggedIn = (state: {users: UsersState}): boolean => getUsersState(state).isLoggedIn;
export const getError = (state: {users: UsersState}): ApiError|null => getUsersState(state).error;
export const getAuthClientData = (state: {users: UsersState}): AuthClientData => getUsersState(state).authClientData;

export function* loginUserSaga(usersStateAction: UsersStateAction):Generator {
  try {
    // @ts-ignore
    const currentUser: CurrentUser = yield* requestAPI(API.loginUser, usersStateAction.loginUserRequest);
    yield put(loginUserSucess(currentUser));
  } catch (error) {
    yield put(loginUserFailure(error));
    yield put(addLastError(error));
  }
}

export function* fetchAuthClientDataSaga():Generator {
  try {
    // @ts-ignore
    const authClientData: AuthClientData = yield* requestAPI(API.fetchAuthClientData);
    yield put(fetchAuthClientDataSuccess(authClientData));
  } catch (error) {
    yield put(fetchAuthClientDataFailure(error));
    yield put(addLastError(error));
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_USER, loginUserSaga);
}

function* watchFetchAuthClientData() {
  yield takeLatest(FETCH_AUTH_CLIENT_DATA, fetchAuthClientDataSaga);
}

export function* authSaga() {
  yield all([
    watchLogin(),
    watchFetchAuthClientData(),
  ]);
}
