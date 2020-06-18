import { all, put, takeLatest } from 'redux-saga/effects'
import requestAPI from '../sagas/requestAPI'
import * as API from '../../api'

export const FETCH_PROJECTS_LIST = 'projects/FETCH_PROJECTS_LIST'
export const FETCH_PROJECTS_LIST_SUCCESS = 'projects/FETCH_PROJECTS_LIST_SUCCESS'
export const FETCH_PROJECTS_LIST_FAILURE = 'projects/FETCH_PROJECTS_LIST_FAILURE'

export const fetchProjectsList = () => ({ type: FETCH_PROJECTS_LIST })
export const fetchProjectsListSuccess = (projects: any) => ({ type: FETCH_PROJECTS_LIST_SUCCESS, projects })
export const fetchProjectsListFailure = (error: any) => ({ type: FETCH_PROJECTS_LIST_FAILURE, error })

const INITIAL_STATE = {
  projectsList: [],
  isLoading: false,
  error: null,
}

export const projectsReducer = (state = INITIAL_STATE, action: { type: any; projects: any; error: any }) => {
  switch (action.type) {
    case FETCH_PROJECTS_LIST:
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case FETCH_PROJECTS_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        projectsList: action.projects,
      }
    case FETCH_PROJECTS_LIST_FAILURE:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      }
    default:
      return state
  }
}

export const getProjects = (state: { projects: any }) => state.projects
export const getProjectsList = (state: { projects: any }) => getProjects(state).projectsList
export const getIsLoading = (state: { projects: any }) => getProjects(state).isLoading
export const getError = (state: { projects: any }) => getProjects(state).error

export function* fetchProjects() {
  try {
    // @ts-ignore
    const projects = yield* requestAPI(API.fetchProjectsList)
    yield put(fetchProjectsListSuccess(projects))
  } catch (error) {
    yield put(fetchProjectsListFailure(error))
  }
}

function* watchFetchProjects() {
  yield takeLatest(FETCH_PROJECTS_LIST, fetchProjects)
}

export function* projectsSaga() {
  yield all([
    watchFetchProjects(),
  ])
}
