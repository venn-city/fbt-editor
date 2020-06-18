import React, { useEffect, useState } from 'react'
import { Button, Grid, makeStyles, Paper, TextField, Typography } from '@material-ui/core'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { parse } from 'query-string'
import { last } from 'ramda'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchFileContent,
  getFileContentList,
  getFilteredContentList,
  getIsLoading,
  getTargetLanguage,
  updateFileContent,
} from '../../store/duck/fileContent'
import FileContentRow from './FileContentRow'
import useCloseAfterCreation from '../../utils/useCloseAfterCreation'
import SearchContent from './SearchContent'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
  },
  headerContainer: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(8),
    height: 52,
  },
  pathHeader: {
    cursor: 'pointer',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(8),
  },
  fileContent: {
    maxHeight: '80vh',
    overflow: 'scroll',
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(8),
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 3, 6),
  },
  actions: {
    marginRight: theme.spacing(8),
  },
  saveButton: {
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
  },
  cancelButton: {
    color: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#bbdef7',
    border: '1px solid rgba(0, 0, 0, 0.6)',
    '&:hover': {
      backgroundColor: '#bbe4f7',
    },
  },
}), { name: 'FileEditor' })

const FileEditor = () => {
  const classes = useStyles()
  const { location: { search }, push } = useHistory()
  const { fileId = '' } = parse(search)
  const dispatch = useDispatch()
  const fileContentList = useSelector(getFileContentList)
  const filteredFileContentList = useSelector(getFilteredContentList)
  const targetLanguage = useSelector(getTargetLanguage)
  const isLoading = useSelector(getIsLoading)
  const { params: { projectId } } = useRouteMatch()

  const contentList = filteredFileContentList.length
    ? filteredFileContentList
    : fileContentList

  const backToCurrentFolder = () => {
    // @ts-ignore
    const folderIdPath = fileId.split('/').filter(Boolean)
    const path = `${folderIdPath.slice(0, folderIdPath.length - 1).join('/')}`
    const search = path && `?folderId=${path}/`
    push({
      pathname: `/project/${projectId}`,
      search
    })
  }

  const redirectToCurrentFolder = useCloseAfterCreation(backToCurrentFolder, getIsLoading)
  // @ts-ignore
  const currentFileName = last(fileId.split('/'))

  useEffect(() => {
    if (projectId || fileId) {
      dispatch(fetchFileContent(projectId, fileId))
    }
  }, [dispatch, projectId, fileId])

  const onSaveFileContent = () => {
    dispatch(updateFileContent(projectId, fileId, targetLanguage, fileContentList))
    redirectToCurrentFolder()
  }

  return (
    <Grid
      md
      container
      item
      direction="column"
      justify="flex-start"
      className={classes.root}
    >
      <Grid container item>
        <Typography variant="h6" className={classes.pathHeader}>
          Projects
        </Typography>
      </Grid>
      <Grid container item className={classes.headerContainer}>
        <Grid container item md={2}>
          <Typography variant="h1">{currentFileName}</Typography>
        </Grid>
        <SearchContent />
        <Grid
          md
          container
          spacing={2}
          justify="flex-end"
          alignItems="center"
          item className={classes.actions}
        >
          <Grid item>
            <Button
              className={classes.cancelButton}
              disabled={isLoading}
              variant="contained"
              onClick={backToCurrentFolder}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.saveButton}
              disabled={isLoading}
              variant="contained"
              onClick={onSaveFileContent}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Paper elevation={6} className={classes.fileContent}>
        {contentList.map(({ id, ...rest }: any) => <FileContentRow key={id} id={id} {...rest} />)}
      </Paper>
    </Grid>
  )
}

export default FileEditor
