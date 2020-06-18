import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import LeftPanel from '../common/LeftPanel'
import ProjectsList from './ProjectsList'
import { fetchProjectsList, getProjectsList } from '../../store/duck/projects'
import { getRecentFilesList, fetchRecentFilesList, reverseRecentFilesList } from '../../store/duck/recentFiles'

const ProjectsPage = () => {
  const dispatch = useDispatch()
  const projects = useSelector(getProjectsList);
  const files = useSelector(getRecentFilesList)

  useEffect(() => {
    dispatch(fetchProjectsList());
    dispatch(fetchRecentFilesList());
  }, [dispatch])

  const onChangeSortFiles = () => {
    dispatch(reverseRecentFilesList())
  }

  return (
    <Grid container>
      <LeftPanel
        files={files}
        onChangeSortFiles={onChangeSortFiles}
        onItemClick={() => console.log('click')}
      />
      <ProjectsList projects={projects} />
    </Grid>
  )
}

// @ts-ignore
export default ProjectsPage
