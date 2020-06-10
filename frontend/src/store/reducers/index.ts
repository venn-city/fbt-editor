import { combineReducers } from 'redux'

import { errorsReducer as errors } from '../duck/errors'
import { projectsReducer as projects } from '../duck/projects'
import { foldersReducer as folders } from '../duck/folders'
import { recentFilesReducer as recentFiles } from '../duck/recentFiles'
import { fileContentReducer as fileContent } from '../duck/fileContent'

export default combineReducers({
  errors,
  projects,
  folders,
  recentFiles,
  fileContent,
})
