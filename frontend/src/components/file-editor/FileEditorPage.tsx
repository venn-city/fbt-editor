import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useRouteMatch } from 'react-router-dom'

import LeftPanel from '../common/LeftPanel'
import FileEditor from './FileEditor'
import { fetchRecentFilesList, getRecentFilesList, reverseRecentFilesList } from '../../store/duck/recentFiles'

const FileEditorPage = () => {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const { params: { projectId } } = useRouteMatch()

  const files = useSelector(getRecentFilesList)

  const onEntityClick = (search: string, method: any, additionalPath = '') => {
    method({
      search,
      pathname: `/project/${projectId}${additionalPath}`,
    })
  }
  const onFileClick = (fileId: string) => onEntityClick(`?fileId=${fileId}`, push, '/file')

  useEffect(() => {
    if (!files.length) {
      dispatch(fetchRecentFilesList())
    }
  }, [dispatch, files])


  return (
    <Grid container>
      <LeftPanel
        searchLabel="Files"
        files={files}
        onSortClick={() => dispatch(reverseRecentFilesList())}
        onItemClick={onFileClick}
      />
      <FileEditor />
    </Grid>
  )
}

export default FileEditorPage
