import { reverse } from "ramda";
import { all, put, takeLatest } from "redux-saga/effects";
import * as API from "../../api";
import { ApiError } from "../../utils/errorTypes";
import requestAPI from "../sagas/requestAPI";
import { RecentFile } from "./../entities";
import { addLastError } from "./errors";

export const FETCH_RECENT_FILES_LIST = "recentFiles/FETCH_RECENT_FILES_LIST";
export const FETCH_RECENT_FILES_LIST_SUCCESS =
  "recentFiles/FETCH_RECENT_FILES_LIST_SUCCESS";
export const FETCH_RECENT_FILES_LIST_FAILURE =
  "recentFiles/FETCH_RECENT_FILES_LIST_FAILURE";
export const REVERSE_RECENT_FILES_LIST =
  "recentFiles/REVERSE_RECENT_FILES_LIST";

export interface RecentFilesState {
  recentFilesList: RecentFile[];
  isLoading: boolean;
  error: Error | null;
}

export interface RecentFilesAction {
  recentFiles: RecentFile[];
  error: ApiError | null;
  type: string;
}

const INITIAL_STATE: RecentFilesState = {
  recentFilesList: [],
  isLoading: false,
  error: null,
};

export const fetchRecentFilesList = (): RecentFilesAction =>
  ({ type: FETCH_RECENT_FILES_LIST } as RecentFilesAction);
export const fetchRecentFilesListSuccess = (
  recentFiles: RecentFile[]
): RecentFilesAction =>
  ({ type: FETCH_RECENT_FILES_LIST_SUCCESS, recentFiles } as RecentFilesAction);
export const fetchRecentFilesListFailure = (
  error: ApiError
): RecentFilesAction =>
  ({ type: FETCH_RECENT_FILES_LIST_FAILURE, error } as RecentFilesAction);
export const reverseRecentFilesList = (): RecentFilesAction =>
  ({ type: REVERSE_RECENT_FILES_LIST } as RecentFilesAction);

export const recentFilesReducer = (
  state: RecentFilesState = INITIAL_STATE,
  action: RecentFilesAction
) => {
  switch (action.type) {
    case FETCH_RECENT_FILES_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_RECENT_FILES_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        recentFilesList: action.recentFiles,
      };
    case FETCH_RECENT_FILES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case REVERSE_RECENT_FILES_LIST:
      return {
        ...state,
        recentFilesList: reverse(state.recentFilesList),
      };
    default:
      return state;
  }
};

export const getRecentFiles = (state: {
  recentFiles: RecentFilesState;
}): RecentFilesState => state.recentFiles;
export const getRecentFilesList = (state: { recentFiles: RecentFilesState }) =>
  getRecentFiles(state).recentFilesList;
export const getIsLoading = (state: { recentFiles: RecentFilesState }) =>
  getRecentFiles(state).isLoading;
export const getError = (state: { recentFiles: RecentFilesState }) =>
  getRecentFiles(state).error;

export function* fetchRecentFiles(): Generator {
  try {
    // @ts-ignore
    const recentFiles: RecentFile[] = yield* requestAPI(
      API.fetchRecentFilesList
    );
    yield put(fetchRecentFilesListSuccess(recentFiles));
  } catch (error) {
    yield put(fetchRecentFilesListFailure(error));
    yield put(addLastError(error));
  }
}

function* watchFetchRecentFiles() {
  yield takeLatest(FETCH_RECENT_FILES_LIST, fetchRecentFiles);
}

export function* recentFilesSaga() {
  yield all([watchFetchRecentFiles()]);
}
