import { all, put, takeLatest } from 'redux-saga/effects'
import requestAPI from '../sagas/requestAPI'
import * as API from '../../api'

export const FETCH_FOLDERS_LIST = 'folders/FETCH_FOLDERS_LIST'
export const FETCH_FOLDERS_LIST_SUCCESS = 'folders/FETCH_FOLDERS_LIST_SUCCESS'
export const FETCH_FOLDERS_LIST_FAILURE = 'folders/FETCH_FOLDERS_LIST_FAILURE'

export const CREATE_FOLDER = 'folders/CREATE_FOLDER'
export const CREATE_FOLDER_SUCCESS = 'folders/CREATE_FOLDER_SUCCESS'
export const CREATE_FOLDER_FAILURE = 'folders/CREATE_FOLDER_FAILURE'

export const DELETE_FOLDER = 'folders/DELETE_FOLDER'
export const DELETE_FOLDER_SUCCESS = 'folders/DELETE_FOLDER_SUCCESS'
export const DELETE_FOLDER_FAILURE = 'folders/DELETE_FOLDER_FAILURE'

export const CLEAR_FOLDER_STATUS = 'folders/CLEAR_FOLDER_STATUS'

export const fetchFoldersList = (
  projectId: string[] | string | null | undefined,
  folderId?: string[] | string | null | undefined,
) => ({ type: FETCH_FOLDERS_LIST, projectId, folderId })

export const fetchFoldersListSuccess = (folders: any) => ({ type: FETCH_FOLDERS_LIST_SUCCESS, folders })
export const fetchFoldersListFailure = (error: any) => ({ type: FETCH_FOLDERS_LIST_FAILURE, error })

export const createFolder = (
  projectId: any,
  parentFolderId: any,
  folderName: any,
  targetLanguage: any
) => ({ type: CREATE_FOLDER, projectId, parentFolderId, folderName, targetLanguage })
export const createFolderSuccess = () => ({ type: CREATE_FOLDER_SUCCESS })
export const createFolderFailure = (error: any) => ({ type: FETCH_FOLDERS_LIST_FAILURE, error })
export const clearFolderStatus = () => ({ type: CLEAR_FOLDER_STATUS })

export const deleteFolder = (projectId: any, folderName: any) => ({ type: DELETE_FOLDER, projectId, folderName })
export const deleteFolderSuccess = () => ({ type: DELETE_FOLDER_SUCCESS })
export const deleteFolderFailure = (error: any) => ({ type: DELETE_FOLDER_FAILURE, error })

const INITIAL_STATE = {
  foldersList: [],
  isLoading: false,
  error: null,
}

export const foldersReducer = (state = INITIAL_STATE, action: {type: any; folders: any; error: any}) => {
  switch (action.type) {
    case FETCH_FOLDERS_LIST:
      return {
        ...state,
        error: null,
      }
    case FETCH_FOLDERS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        foldersList: action.folders,
      }
    case FETCH_FOLDERS_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case CREATE_FOLDER:
      return {
        ...state,
        isLoading: true,
        isUpdatingFolders: false,
      }
    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdatingFolders: true,
      }
    case CREATE_FOLDER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isUpdatingFolders: false,
      }
    case CLEAR_FOLDER_STATUS:
      return {
        ...state,
        isUpdatingFolders: false,
      }
    case DELETE_FOLDER:
      return {
        ...state,
        isLoading: true,
      }
    case DELETE_FOLDER_SUCCESS:
      return {
        ...state,
        isUpdatingFolders: true,
        isLoading: false,
      }
    case DELETE_FOLDER_FAILURE:
      return {
        ...state,
        isUpdatingFolders: false,
        isLoading: false,
      }
    default:
      return state
  }
}

export const getFolders = (state: {folders: any}) => state.folders
export const getFoldersList = (state: {folders: any}) => getFolders(state).foldersList
export const getIsLoading = (state: {folders: any}) => getFolders(state).isLoading
export const getIsCreatingFolder = (state: {folders: any}) => getFolders(state).isUpdatingFolders
export const getError = (state: {folders: any}) => getFolders(state).error

export function* fetchFoldersSaga({ projectId, folderId = '' }: any) {
  try {
    // @ts-ignore
    const { items: folders } = yield* requestAPI(API.fetchFolders, projectId, folderId)
    yield put(fetchFoldersListSuccess(folders))
  } catch (error) {
    yield put(fetchFoldersListFailure(error))
  }
}

export function* createFolderSaga({ projectId, parentFolderId, folderName, targetLanguage }: any) {
  try {
    // @ts-ignore
    yield* requestAPI(API.createFolder, projectId, parentFolderId, folderName, targetLanguage)
    yield put(createFolderSuccess())

  } catch (error) {
    yield put(createFolderFailure(error))
  }
}

export function* deleteFolderSaga({ projectId, folderName }: any) {
  try {
    // @ts-ignore
    yield* requestAPI(API.deleteFolder, projectId, folderName)
    yield put(deleteFolderSuccess())

  } catch (error) {
    yield put(deleteFolderFailure(error))
  }
}

function* watchFetchFolders() {
  yield takeLatest(FETCH_FOLDERS_LIST, fetchFoldersSaga)
}

function* watchCreateFolder() {
  yield takeLatest(CREATE_FOLDER, createFolderSaga)
}

function* watchDeleteFolder() {
  yield takeLatest(DELETE_FOLDER, deleteFolderSaga)
}

export function* foldersSaga() {
  yield all([
    watchFetchFolders(),
    watchCreateFolder(),
    watchDeleteFolder(),
  ])
}
