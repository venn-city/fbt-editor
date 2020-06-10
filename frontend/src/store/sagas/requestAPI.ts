import { call } from 'redux-saga/effects'

export default function* (method: object, ...params: any) {
  // @ts-ignore
  return yield call(method, ...params)
}
