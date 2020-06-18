import { all, put, takeLatest } from 'redux-saga/effects'
import requestAPI from '../sagas/requestAPI'
import * as API from '../../api'
import { reverse } from 'ramda'


export const FETCH_RECENT_FILES_LIST = 'recentFiles/FETCH_RECENT_FILES_LIST'
export const FETCH_RECENT_FILES_LIST_SUCCESS = 'recentFiles/FETCH_RECENT_FILES_LIST_SUCCESS'
export const FETCH_RECENT_FILES_LIST_FAILURE = 'recentFiles/FETCH_RECENT_FILES_LIST_FAILURE'
export const REVERSE_RECENT_FILES_LIST = 'recentFiles/REVERSE_RECENT_FILES_LIST'

export const fetchRecentFilesList = () => ({ type: FETCH_RECENT_FILES_LIST })
export const fetchRecentFilesListSuccess = (recentFiles: any) => ({ type: FETCH_RECENT_FILES_LIST_SUCCESS, recentFiles })
export const fetchRecentFilesListFailure = (error: any) => ({ type: FETCH_RECENT_FILES_LIST_FAILURE, error })
export const reverseRecentFilesList = () => ({ type: REVERSE_RECENT_FILES_LIST })

const INITIAL_STATE = {
  recentFilesList: [],
  isLoading: false,
  error: null,
}

export const recentFilesReducer = (state = INITIAL_STATE, action: {type: any; recentFiles: any; error: any}) => {
  switch (action.type) {
    case FETCH_RECENT_FILES_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case FETCH_RECENT_FILES_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        recentFilesList: action.recentFiles,
      }
    case FETCH_RECENT_FILES_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }
    case REVERSE_RECENT_FILES_LIST:
      return {
        ...state,
        recentFilesList: reverse(state.recentFilesList),
      }
    default:
      return state
  }
}

export const getRecentFiles = (state: {recentFiles: any}) => state.recentFiles
export const getRecentFilesList = (state: {recentFiles: any}) => getRecentFiles(state).recentFilesList
export const getIsLoading = (state: {recentFiles: any}) => getRecentFiles(state).isLoading
export const getError = (state: {recentFiles: any}) => getRecentFiles(state).error


export function* fetchRecentFiles() {
  try {
    // @ts-ignore
    const recentFiles = yield* requestAPI(API.fetchRecentFilesList)
    yield put(fetchRecentFilesListSuccess(recentFiles))
  } catch (error) {
    yield put(fetchRecentFilesListFailure(error))
  }
}

function* watchFetchRecentFiles() {
  yield takeLatest(FETCH_RECENT_FILES_LIST, fetchRecentFiles)
}

export function* recentFilesSaga() {
  yield all([
    watchFetchRecentFiles(),
  ])
}
