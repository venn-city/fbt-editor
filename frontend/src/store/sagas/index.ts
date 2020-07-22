import { all } from 'redux-saga/effects';
import { authSaga as auth } from '../duck/auth';
import { fileContentSaga as fileContent } from '../duck/fileContent';
import { projectItemsSaga as projectItems } from '../duck/projectItems';
import { projectsSaga as projects } from '../duck/projects';
import { recentFilesSaga as recentFiles } from '../duck/recentFiles';

export default function* () {
  yield all([
    projectItems(),
    projects(),
    recentFiles(),
    fileContent(),
    auth(),
  ]);
}
