import { reverse } from "ramda";
import { all, put, takeLatest } from "redux-saga/effects";
import * as API from "../../api";
import { ApiError } from "../../utils/errorTypes";
import { Project } from "../entities";
import requestAPI from "../sagas/requestAPI";
import { addLastError } from "./errors";

export const FETCH_PROJECTS_LIST = "projects/FETCH_PROJECTS_LIST";
export const FETCH_PROJECTS_LIST_SUCCESS =
  "projects/FETCH_PROJECTS_LIST_SUCCESS";
export const FETCH_PROJECTS_LIST_FAILURE =
  "projects/FETCH_PROJECTS_LIST_FAILURE";
export const REVERSE_PROJECTS_LIST = "recentFiles/REVERSE_PROJECTS_LIST";

export interface ProjectsState {
  projectsList: Project[];
  isLoading: boolean;
  error: ApiError | null;
}

export interface ProjectsAction {
  projects: Project[];
  type: string;
  error: ApiError | null;
}

const INITIAL_STATE: ProjectsState = {
  projectsList: [],
  isLoading: false,
  error: null,
};

export const fetchProjectsList = (): ProjectsAction =>
  ({ type: FETCH_PROJECTS_LIST } as ProjectsAction);
export const fetchProjectsListSuccess = (projects: Project[]): ProjectsAction =>
  ({ type: FETCH_PROJECTS_LIST_SUCCESS, projects } as ProjectsAction);
export const fetchProjectsListFailure = (error: ApiError): ProjectsAction =>
  ({ type: FETCH_PROJECTS_LIST_FAILURE, error } as ProjectsAction);
export const reverseProjectsList = (): ProjectsAction =>
  ({ type: REVERSE_PROJECTS_LIST } as ProjectsAction);

export const projectsReducer = (
  state: ProjectsState = INITIAL_STATE,
  action: ProjectsAction
) => {
  switch (action.type) {
    case FETCH_PROJECTS_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        projectsList: action.projects,
      };
    case FETCH_PROJECTS_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case REVERSE_PROJECTS_LIST:
      return {
        ...state,
        projectsList: reverse(state.projectsList),
      };
    default:
      return state;
  }
};

export const getProjects = (state: {
  projects: ProjectsState;
}): ProjectsState => state.projects;
export const getProjectsList = (state: {
  projects: ProjectsState;
}): Project[] => getProjects(state).projectsList;
export const getIsLoading = (state: { projects: ProjectsState }): boolean =>
  getProjects(state).isLoading;
export const getError = (state: { projects: ProjectsState }): Error | null =>
  getProjects(state).error;

export function* fetchProjects(): Generator {
  try {
    // @ts-ignore
    const projects: Project[] = yield* requestAPI(API.fetchProjectsList);
    yield put(fetchProjectsListSuccess(projects));
  } catch (error) {
    yield put(fetchProjectsListFailure(error));
    yield put(addLastError(error));
  }
}

function* watchFetchProjects(): Generator {
  yield takeLatest(FETCH_PROJECTS_LIST, fetchProjects);
}

export function* projectsSaga(): Generator {
  yield all([watchFetchProjects()]);
}
