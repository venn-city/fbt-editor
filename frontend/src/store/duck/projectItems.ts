import { reverse } from "ramda";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as API from "../../api";
import { ApiError } from "../../utils/errorTypes";
import {
  CreateItemRequest,
  DeleteItemRequest,
  ProjectItem,
  ProjectItemType,
} from "../entities";
import requestAPI from "../sagas/requestAPI";
import { addLastError } from "./errors";

export const FETCH_PROJECT_ITEMS_LIST = "projectItems/FETCH_PROJECT_ITEMS_LIST";
export const FETCH_PROJECT_ITEMS_LIST_SUCCESS =
  "projectItems/FETCH_PROJECT_ITEMS_LIST_SUCCESS";
export const FETCH_PROJECT_ITEMS_LIST_FAILURE =
  "projectItems/FETCH_PROJECT_ITEMS_LIST_FAILURE";
export const REVERSE_PROJECT_ITEMS_LIST =
  "recentFiles/REVERSE_PROJECT_ITEMS_LIST";

export const CREATE_PROJECT_ITEM = "projectItems/CREATE_PROJECT_ITEM";
export const CREATE_PROJECT_ITEM_SUCCESS =
  "projectItems/CREATE_PROJECT_ITEM_SUCCESS";
export const CREATE_PROJECT_ITEM_FAILURE =
  "projectItems/CREATE_PROJECT_ITEM_FAILURE";

export const DELETE_PROJECT_ITEM = "projectItems/DELETE_PROJECT_ITEM";
export const DELETE_PROJECT_ITEM_SUCCESS =
  "projectItems/DELETE_PROJECT_ITEM_SUCCESS";
export const DELETE_PROJECT_ITEM_FAILURE =
  "projectItems/DELETE_PROJECT_ITEM_FAILURE";

export const CLEAR_PROJECT_ITEM_STATUS =
  "projectItems/CLEAR_PROJECT_ITEM_STATUS";

export const UPLOAD_SOURCE_FILE = "projectItems/UPLOAD_SOURCE_FILE";
export const UPLOAD_SOURCE_SUCCESS = "projectItems/UPLOAD_SOURCE_SUCCESS";
export const UPLOAD_SOURCE_FAILURE = "projectItems/UPLOAD_SOURCE_FAILURE";

interface ProjectItemsState {
  projectItemsList: ProjectItem[];
  isLoading: boolean;
  error: ApiError | null;
  isUpdatingProjectItems: boolean;
}

export interface ProjectItemsAction {
  projectItems: ProjectItem[] | undefined;
  error: ApiError | undefined;
  type: string;
  projectId: string | undefined;
  projectItemId: string | undefined;
  formData: FormData | undefined;
  сreateItemRequest: CreateItemRequest | undefined;
  deleteItemRequest: DeleteItemRequest | undefined;
}

const INITIAL_STATE: ProjectItemsState = {
  projectItemsList: [],
  isLoading: false,
  error: null,
  isUpdatingProjectItems: false,
};

export const fetchProjectItemsList = (
  projectId: string,
  projectItemId?: string | undefined
): ProjectItemsAction =>
  ({
    type: FETCH_PROJECT_ITEMS_LIST,
    projectId,
    projectItemId,
  } as ProjectItemsAction);

export const fetchProjectItemsListSuccess = (
  projectItems: ProjectItem[]
): ProjectItemsAction =>
  ({
    type: FETCH_PROJECT_ITEMS_LIST_SUCCESS,
    projectItems,
  } as ProjectItemsAction);
export const fetchProjectItemsListFailure = (
  error: ApiError
): ProjectItemsAction =>
  ({ type: FETCH_PROJECT_ITEMS_LIST_FAILURE, error } as ProjectItemsAction);

export const reverseProjectItemsList = (): ProjectItemsAction =>
  ({ type: REVERSE_PROJECT_ITEMS_LIST } as ProjectItemsAction);

export const createProjectItem = (
  сreateItemRequest: CreateItemRequest
): ProjectItemsAction =>
  ({
    type: CREATE_PROJECT_ITEM,
    сreateItemRequest: сreateItemRequest,
  } as ProjectItemsAction);
export const createProjectItemSuccess = (): ProjectItemsAction =>
  ({ type: CREATE_PROJECT_ITEM_SUCCESS } as ProjectItemsAction);
export const createProjectItemFailure = (error: ApiError): ProjectItemsAction =>
  ({ type: CREATE_PROJECT_ITEM_FAILURE, error } as ProjectItemsAction);
export const clearProjectItemStatus = () =>
  ({ type: CLEAR_PROJECT_ITEM_STATUS } as ProjectItemsAction);

export const deleteProjectItem = (
  deleteItemRequest: DeleteItemRequest
): ProjectItemsAction =>
  ({ type: DELETE_PROJECT_ITEM, deleteItemRequest } as ProjectItemsAction);
export const deleteProjectItemSuccess = (): ProjectItemsAction =>
  ({ type: DELETE_PROJECT_ITEM_SUCCESS } as ProjectItemsAction);
export const deleteProjectItemFailure = (error: ApiError): ProjectItemsAction =>
  ({ type: DELETE_PROJECT_ITEM_FAILURE, error } as ProjectItemsAction);

export const uploadSourceFile = (formData: FormData): ProjectItemsAction =>
  ({ type: UPLOAD_SOURCE_FILE, formData } as ProjectItemsAction);
export const uploadSourceSuccess = (): ProjectItemsAction =>
  ({ type: UPLOAD_SOURCE_SUCCESS } as ProjectItemsAction);
export const uploadSourceFailure = (error: ApiError): ProjectItemsAction =>
  ({ type: UPLOAD_SOURCE_FAILURE, error } as ProjectItemsAction);

export const projectItemsReducer = (
  state: ProjectItemsState = INITIAL_STATE,
  action: ProjectItemsAction
) => {
  switch (action.type) {
    case FETCH_PROJECT_ITEMS_LIST:
      return {
        ...state,
        error: null,
      };
    case FETCH_PROJECT_ITEMS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        projectItemsList: action.projectItems,
      };
    case FETCH_PROJECT_ITEMS_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case REVERSE_PROJECT_ITEMS_LIST:
      return {
        ...state,
        projectItemsList: reverse(state.projectItemsList),
      };
    case CREATE_PROJECT_ITEM:
      return {
        ...state,
        isLoading: true,
        isUpdatingProjectItems: false,
      };
    case CREATE_PROJECT_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdatingProjectItems: true,
      };
    case CREATE_PROJECT_ITEM_FAILURE:
      return {
        ...state,
        isLoading: false,
        isUpdatingProjectItems: true,
      };
    case UPLOAD_SOURCE_FILE:
      return {
        ...state,
        isLoading: true,
        isUpdatingProjectItems: false,
      };
    case UPLOAD_SOURCE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isUpdatingProjectItems: true,
      };
    case UPLOAD_SOURCE_FAILURE:
      return {
        ...state,
        isUpdatingProjectItems: false,
        isLoading: false,
      };
    case CLEAR_PROJECT_ITEM_STATUS:
      return {
        ...state,
        isUpdatingProjectItems: false,
      };
    case DELETE_PROJECT_ITEM:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_PROJECT_ITEM_SUCCESS:
      return {
        ...state,
        isUpdatingProjectItems: true,
        isLoading: false,
      };
    case DELETE_PROJECT_ITEM_FAILURE:
      return {
        ...state,
        isUpdatingProjectItems: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const getProjectItems = (state: {
  projectItems: ProjectItemsState;
}): ProjectItemsState => state.projectItems;
export const getProjectItemsList = (state: {
  projectItems: ProjectItemsState;
}): ProjectItem[] => getProjectItems(state).projectItemsList;
export const getFilesList = (state: {
  projectItems: ProjectItemsState;
}): ProjectItem[] =>
  getProjectItems(state).projectItemsList.filter(
    (item) => item.type === ProjectItemType.File
  );
export const getIsLoading = (state: {
  projectItems: ProjectItemsState;
}): boolean => getProjectItems(state).isLoading;
export const getIsCreatingProjectItem = (state: {
  projectItems: ProjectItemsState;
}): boolean => getProjectItems(state).isUpdatingProjectItems;
export const getError = (state: {
  projectItems: ProjectItemsState;
}): Error | null => getProjectItems(state).error;

export function* fetchProjectItemsSaga({
  projectId,
  projectItemId = "",
}: ProjectItemsAction) {
  try {
    // @ts-ignore
    const { items: projectItems } = yield* requestAPI(
      API.fetchProjectItems,
      projectId,
      projectItemId
    );
    yield put(fetchProjectItemsListSuccess(projectItems));
  } catch (error) {
    yield put(fetchProjectItemsListFailure(error));
    yield put(addLastError(error));
  }
}

export function* createProjectItemSaga(action: ProjectItemsAction) {
  try {
    // @ts-ignore
    yield* requestAPI(API.createProjectItem, action.сreateItemRequest);
    yield put(createProjectItemSuccess());
  } catch (error) {
    yield put(addLastError(error));
    yield put(createProjectItemFailure(error));
  }
}

export function* deleteProjectItemSaga(action: ProjectItemsAction) {
  try {
    // @ts-ignore
    yield* requestAPI(API.deleteProjectItem, action.deleteItemRequest);
    yield put(deleteProjectItemSuccess());
  } catch (error) {
    yield put(deleteProjectItemFailure(error));
    yield put(addLastError(error));
  }
}

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export function* uploadSourceFileSaga(action: ProjectItemsAction) {
  try {
    // @ts-ignore
    yield* requestAPI(API.uploadSourceFile, action.formData);
    yield call(delay, 1000);
    yield put(uploadSourceSuccess());
  } catch (error) {
    yield put(uploadSourceFailure(error));
    yield put(addLastError(error));
  }
}

function* watchFetchProjectItems() {
  yield takeLatest(FETCH_PROJECT_ITEMS_LIST, fetchProjectItemsSaga);
}

function* watchCreateProjectItem() {
  yield takeLatest(CREATE_PROJECT_ITEM, createProjectItemSaga);
}

function* watchDeleteProjectItem() {
  yield takeLatest(DELETE_PROJECT_ITEM, deleteProjectItemSaga);
}

function* watchUploadSourceFile() {
  yield takeLatest(UPLOAD_SOURCE_FILE, uploadSourceFileSaga);
}

export function* projectItemsSaga() {
  yield all([
    watchFetchProjectItems(),
    watchCreateProjectItem(),
    watchDeleteProjectItem(),
    watchUploadSourceFile(),
  ]);
}
