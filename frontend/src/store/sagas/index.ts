import { all } from 'redux-saga/effects'

import { errorsSaga as errors } from '../duck/errors'
import { projectsSaga as projects } from '../duck/projects'
import { foldersSaga as folders } from '../duck/folders'
import { recentFilesSaga as recentFiles } from '../duck/recentFiles'
import { fileContentSaga as fileContent } from '../duck/fileContent'

export default function* () {
  yield all([
    errors(),
    folders(),
    projects(),
    recentFiles(),
    fileContent(),
  ])
}
