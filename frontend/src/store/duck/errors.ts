import { all, put, takeEvery } from 'redux-saga/effects'

export const ADD_LAST_ERROR = 'errors/ADD_LAST_ERROR'
export const CLEAR_LAST_ERROR = 'errors/CLEAR_LAST_ERROR'

export const addLastError = (error: any) => ({ type: ADD_LAST_ERROR, error })
export const clearLastError = () => ({ type: CLEAR_LAST_ERROR })

const INITIAL_STATE = {
  lastError: null,
}

const errorMatcher: any = (action: any) => action.type.match('_FAILURE$')

export const errorsReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case ADD_LAST_ERROR:
      return { ...state, lastError: action.error }
    case CLEAR_LAST_ERROR:
      return { ...state, lastError: null }
    default:
      return state
  }
}

export const getErrors = (state: any) => state.errors
export const getLastError = (state: any) => getErrors(state).lastError

export function* reportError(action: any) {
  const { error } = action

  // eslint-disable-next-line no-console
  console.error(error)
  yield put(addLastError(error))
}

function* watchFailures() {
  yield takeEvery(errorMatcher, reportError)
}

export function* errorsSaga() {
  yield all([
    watchFailures(),
  ])
}
