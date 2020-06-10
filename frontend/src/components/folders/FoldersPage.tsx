import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { parse } from 'query-string'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import LeftPanel from '../common/LeftPanel'
import FoldersList from './FoldersList'
import { fetchFoldersList } from '../../store/duck/folders'
import { getRecentFilesList, reverseRecentFilesList, fetchRecentFilesList, getIsLoading } from '../../store/duck/recentFiles'

const FoldersPage = () => {
  const { location: { search }, push } = useHistory()
  const dispatch = useDispatch()
  const { folderId } = parse(search)
  const { params: { projectId } } = useRouteMatch()
  const recentFilesList = useSelector(getRecentFilesList)

  useEffect(() => {
    if (projectId || folderId) {
      dispatch(fetchFoldersList(projectId, folderId))
    }
  }, [dispatch, projectId, folderId])

  useEffect(() => {
    dispatch(fetchRecentFilesList())
  }, [])

  const onEntityClick = (search: string, method: any, additionalPath = '') => {
    method({
      search,
      pathname: `/project/${projectId}${additionalPath}`,
    })
  }
  const onFileClick = (fileId: string) => onEntityClick(`?fileId=${fileId}`, push, '/file')

  return (
    <Grid container>
      <LeftPanel
        searchLabel="Projects"
        files={recentFilesList}
        onSortClick={() => dispatch(reverseRecentFilesList())}
        onItemClick={onFileClick}
      />
      <FoldersList header={projectId} />
    </Grid>
  )
}

// @ts-ignore
export default FoldersPage
