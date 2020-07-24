import { all, put, takeLatest } from "redux-saga/effects";
import * as API from "../../api";
import { ApiError } from "../../utils/errorTypes";
import requestAPI from "../sagas/requestAPI";
import { getUpdatedTranslations } from "../utils/fileContentUtils";
import {
  ProjectFileContent,
  ProjectFileItem,
  UpdateFileItemData
} from "./../entities";
import { addLastError } from "./errors";

export const FETCH_FILE_CONTENT = "fileContent/FETCH_FILE_CONTENT";
export const FETCH_FILE_CONTENT_SUCCESS =
  "fileContent/FETCH_FILE_CONTENT_SUCCESS";
export const FETCH_FILE_CONTENT_FAILURE =
  "fileContent/FETCH_FILE_CONTENT_FAILURE";

export const UPDATE_FILE_CONTENT = "fileContent/UPDATE_FILE_CONTENT";
export const UPDATE_FILE_CONTENT_SUCCESS =
  "fileContent/UPDATE_FILE_CONTENT_SUCCESS";
export const UPDATE_FILE_CONTENT_FAILURE =
  "fileContent/UPDATE_FILE_CONTENT_FAILURE";

export const UPDATE_FILE_CONTENT_FIELD =
  "fileContent/UPDATE_FILE_CONTENT_FIELD";

export const SET_FILTERED_FILE_CONTENT =
  "fileContent/SET_FILTERED_FILE_CONTENT";
export const CLEAR_FILTERED_FILE_CONTENT =
  "fileContent/CLEAR_FILTERED_FILE_CONTENT";

export const CLEAR_FILE_CONTENT = "fileContent/CLEAR_FILE_CONTENT";

export interface FileContentState {
  fileContentMap: { [id: string]: ProjectFileItem };
  isLoading: boolean;
  error: ApiError | null;
  filteredFileContentList: ProjectFileItem[];
  targetLanguage: string;
}

export interface FileContentAction {
  targetLanguage: string | undefined;
  fileId: string;
  projectId: string;
  type: string;
  projectFileItems: ProjectFileItem[] | undefined;
  error: ApiError | undefined;
  updateFileItemData: UpdateFileItemData | undefined;
  searchTerm: string | undefined;
}

const INITIAL_STATE: FileContentState = {
  fileContentMap: {},
  isLoading: false,
  error: null,
  filteredFileContentList: [],
  targetLanguage: "",
};

export const fetchFileContent = (
  projectId: string,
  fileId: string,
): FileContentAction =>
  ({ type: FETCH_FILE_CONTENT, projectId, fileId } as FileContentAction);

export const fetchFileContentSuccess = (
  projectFileItems: ProjectFileItem[],
  targetLanguage: string,
): FileContentAction =>
  ({
    type: FETCH_FILE_CONTENT_SUCCESS,
    projectFileItems,
    targetLanguage,
  } as FileContentAction);
export const fetchFileContentFailure = (error: ApiError): FileContentAction =>
  ({ type: FETCH_FILE_CONTENT_FAILURE, error } as FileContentAction);

export const updateFileContent = (
  projectId: string,
  fileId: string,
  targetLanguage: string,
  projectFileItems: ProjectFileItem[],
): FileContentAction =>
  ({
    type: UPDATE_FILE_CONTENT,
    projectId,
    fileId,
    targetLanguage,
    projectFileItems,
  } as FileContentAction);

export const updateFileContentSuccess = () => ({
  type: UPDATE_FILE_CONTENT_SUCCESS,
});
export const updateFileContentFailure = (error: ApiError) => ({
  type: UPDATE_FILE_CONTENT_FAILURE,
  error,
});

export const updateFileContentField = (
  updateFileItemData: UpdateFileItemData,
): FileContentAction =>
  ({
    type: UPDATE_FILE_CONTENT_FIELD,
    updateFileItemData,
  } as FileContentAction);

export const setFilteredFileContent = (searchTerm: string): FileContentAction =>
  ({ type: SET_FILTERED_FILE_CONTENT, searchTerm } as FileContentAction);
export const clearFilteredFileContent = (): FileContentAction =>
  ({ type: CLEAR_FILTERED_FILE_CONTENT } as FileContentAction);
export const clearFileContent = (): FileContentAction =>
  ({ type: CLEAR_FILE_CONTENT } as FileContentAction);

export const fileContentReducer = (
  state: FileContentState = INITIAL_STATE,
  action: FileContentAction,
) => {
  switch (action.type) {
    case FETCH_FILE_CONTENT:
      return {
        ...state,
        error: null,
      };
    case FETCH_FILE_CONTENT_SUCCESS:
      return {
        ...state,
        error: null,
        targetLanguage: action.targetLanguage,
        fileContentMap: action.projectFileItems!.reduce(
          (acc: ProjectFileItem, fileContent: ProjectFileItem) => ({
            ...acc,
            [fileContent.id]: fileContent,
          }),
          {} as ProjectFileItem,
        ),
      };
    case FETCH_FILE_CONTENT_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case UPDATE_FILE_CONTENT_FIELD:
      return {
        ...state,
        fileContentMap: {
          ...state.fileContentMap,
          [action.updateFileItemData!.id]: {
            ...state.fileContentMap[action.updateFileItemData!.id],
            translations: getUpdatedTranslations(
              state.fileContentMap[action.updateFileItemData!.id].translations,
              action.updateFileItemData!.projectFileItemTranslation,
            ),
          },
        },
      };
    case UPDATE_FILE_CONTENT:
      return {
        ...state,
        isLoading: true,
      };
    case UPDATE_FILE_CONTENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case UPDATE_FILE_CONTENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case SET_FILTERED_FILE_CONTENT:
      return {
        ...state,
        filteredFileContentList: Object.values(
          state.fileContentMap,
        ).filter((projectFileItem: ProjectFileItem) =>
          projectFileItem.source.toLowerCase().includes(action.searchTerm!),
        ),
      };
    case CLEAR_FILTERED_FILE_CONTENT:
      return {
        ...state,
        filteredFileContentList: [],
      };
    case CLEAR_FILE_CONTENT:
      return {
        ...state,
        fileContentMap: {},
      };
    default:
      return state;
  }
};

export const getFileContent = (state: {
  fileContent: FileContentState;
}): FileContentState => state.fileContent;
export const getFileContentList = (state: {
  fileContent: FileContentState;
}): ProjectFileItem[] => Object.values(getFileContent(state).fileContentMap);
export const getFilteredContentList = (state: {
  fileContent: FileContentState;
}): ProjectFileItem[] => getFileContent(state).filteredFileContentList;
export const getTargetLanguage = (state: {
  fileContent: FileContentState;
}): string => getFileContent(state).targetLanguage;
export const getIsLoading = (state: {
  fileContent: FileContentState;
}): boolean => getFileContent(state).isLoading;
export const getError = (state: {
  fileContent: FileContentState;
}): ApiError | null => getFileContent(state).error;

export function* fetchFileContentSaga({
  projectId,
  fileId = "",
}: FileContentAction) {
  try {
    // @ts-ignore
    const { projectFileItems, targetLanguage } = yield* requestAPI(
      API.fetchFileContent,
      projectId,
      fileId,
    );
    yield put(fetchFileContentSuccess(projectFileItems, targetLanguage));
  } catch (error) {
    yield put(fetchFileContentFailure(error));
    yield put(addLastError(error));
  }
}

export function* updateFileContentSaga({
  projectId,
  fileId = "",
  targetLanguage,
  projectFileItems,
}: FileContentAction) {
  try {
    // @ts-ignore
    yield* requestAPI(API.updateFileContent, {
      projectId,
      fileId,
      targetLanguage,
      projectFileItems,
    } as ProjectFileContent);
    yield put(updateFileContentSuccess());
  } catch (error) {
    yield put(updateFileContentFailure(error));
    yield put(addLastError(error));
  }
}

function* watchFetchFileContent() {
  yield takeLatest(FETCH_FILE_CONTENT, fetchFileContentSaga);
}

function* watchUpdateFileContent() {
  yield takeLatest(UPDATE_FILE_CONTENT, updateFileContentSaga);
}

export function* fileContentSaga() {
  yield all([watchFetchFileContent(), watchUpdateFileContent()]);
}
