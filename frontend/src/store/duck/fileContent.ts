import { all, put, takeLatest } from 'redux-saga/effects'
import requestAPI from '../sagas/requestAPI'
import * as API from '../../api'

export const FETCH_FILE_CONTENT = 'fileContent/FETCH_FILE_CONTENT'
export const FETCH_FILE_CONTENT_SUCCESS = 'fileContent/FETCH_FILE_CONTENT_SUCCESS'
export const FETCH_FILE_CONTENT_FAILURE = 'fileContent/FETCH_FILE_CONTENT_FAILURE'

export const UPDATE_FILE_CONTENT = 'fileContent/UPDATE_FILE_CONTENT'
export const UPDATE_FILE_CONTENT_SUCCESS = 'fileContent/UPDATE_FILE_CONTENT_SUCCESS'
export const UPDATE_FILE_CONTENT_FAILURE = 'fileContent/UPDATE_FILE_CONTENT_FAILURE'

export const UPDATE_FILE_CONTENT_FIELD = 'fileContent/UPDATE_FILE_CONTENT_FIELD'

export const SET_FILTERED_FILE_CONTENT = 'fileContent/SET_FILTERED_FILE_CONTENT'
export const CLEAR_FILTERED_FILE_CONTENT = 'fileContent/CLEAR_FILTERED_FILE_CONTENT'

export const fetchFileContent = (
  projectId: string[] | string | null | undefined,
  fileId?: string[] | string | null | undefined,
) => ({ type: FETCH_FILE_CONTENT, projectId, fileId })

export const fetchFileContentSuccess = (fileContentList: any, targetLanguage: any) =>
  ({ type: FETCH_FILE_CONTENT_SUCCESS, fileContentList, targetLanguage })
export const fetchFileContentFailure = (error: any) => ({ type: FETCH_FILE_CONTENT_FAILURE, error })

export const updateFileContent = (
  projectId: string[] | string | null | undefined,
  fileId?: string[] | string | null | undefined,
  targetLanguage?: any,
  projectFileItems?: any,
) => ({ type: UPDATE_FILE_CONTENT, projectId, fileId, targetLanguage, projectFileItems })

export const updateFileContentSuccess = () => ({ type: UPDATE_FILE_CONTENT_SUCCESS })
export const updateFileContentFailure = (error: any) => ({ type: UPDATE_FILE_CONTENT_FAILURE, error })

export const updateFileContentField = (updatedField: object) => ({ type: UPDATE_FILE_CONTENT_FIELD, updatedField })
export const setFilteredFileContent = (searchTerm: string) => ({ type: SET_FILTERED_FILE_CONTENT, searchTerm })
export const clearFilteredFileContent = () => ({ type: CLEAR_FILTERED_FILE_CONTENT })

const INITIAL_STATE = {
  fileContentMap: {},
  isLoading: false,
  error: null,
  filteredFileContentList: [],
}

export const fileContentReducer = (
  state: any = INITIAL_STATE,
  action: {
    targetLanguage: any; type: any; fileContentList: any; error: any, updatedField: any; searchTerm: any;
  },
) => {
  switch (action.type) {
    case FETCH_FILE_CONTENT:
      return {
        ...state,
        error: null,
      }
    case FETCH_FILE_CONTENT_SUCCESS:
      return {
        ...state,
        error: null,
        targetLanguage: action.targetLanguage,
        fileContentMap: action.fileContentList
          .reduce((acc: any, fileContent: any) => ({ ...acc, [fileContent.id]: fileContent }), {}),
      }
    case FETCH_FILE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
      }
    case UPDATE_FILE_CONTENT_FIELD:
      return {
        ...state,
        fileContentMap: {
          ...state.fileContentMap,
          [action.updatedField.id]: {
            ...state.fileContentMap[action.updatedField.id],
            [action.updatedField.field]: action.updatedField.value,
          },
        }
      }
    case UPDATE_FILE_CONTENT:
      return {
        ...state,
        isLoading: true,
      }
    case UPDATE_FILE_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      }
    case UPDATE_FILE_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      }
    case SET_FILTERED_FILE_CONTENT:
      return {
        ...state,
        filteredFileContentList: Object.values(state.fileContentMap)
          .filter(({ source }: any) => source.toLowerCase().includes(action.searchTerm))
      }
    case CLEAR_FILTERED_FILE_CONTENT:
      return {
        ...state,
        filteredFileContentList: [],
      }
    default:
      return state
  }
}

export const getFileContent = (state: {fileContent: any}) => state.fileContent
export const getFileContentList = (state: {fileContent: any}) => Object.values(getFileContent(state).fileContentMap)
export const getFilteredContentList = (state: {fileContent: any}) => getFileContent(state).filteredFileContentList
export const getTargetLanguage = (state: {fileContent: any}) => getFileContent(state).targetLanguage
export const getIsLoading = (state: {fileContent: any}) => getFileContent(state).isLoading
export const getError = (state: {fileContent: any}) => getFileContent(state).error

export function* fetchFileContentSaga({ projectId, fileId = '' }: any) {
  try {
    // @ts-ignore
    const { projectFileItems, targetLanguage } = yield* requestAPI(API.fetchFileContent, projectId, fileId)
    yield put(fetchFileContentSuccess(projectFileItems, targetLanguage))
  } catch (error) {
    yield put(fetchFileContentFailure(error))
  }
}

export function* updateFileContentSaga({ projectId, fileId = '', targetLanguage, projectFileItems }: any) {
  try {
    // @ts-ignore
    yield* requestAPI(API.updateFileContent, projectId, fileId, targetLanguage, projectFileItems)
    yield put(updateFileContentSuccess())
  } catch (error) {
    yield put(updateFileContentFailure(error))
  }
}

function* watchFetchFileContent() {
  yield takeLatest(FETCH_FILE_CONTENT, fetchFileContentSaga)
}

function* watchUpdateFileContent() {
  yield takeLatest(UPDATE_FILE_CONTENT, updateFileContentSaga)
}

export function* fileContentSaga() {
  yield all([
    watchFetchFileContent(),
    watchUpdateFileContent(),
  ])
}
