import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, Typography, IconButton } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { Sort, KeyboardBackspace, NoteAdd, CreateNewFolder, SaveAlt } from '@material-ui/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuid } from 'uuid'

import Folder from './Folder'
import {
  clearFolderStatus,
  createFolder,
  fetchFoldersList,
  getFoldersList,
  getIsCreatingFolder,
  getIsLoading
} from '../../store/duck/folders'
import { parse } from 'query-string'
import DialogModal from '../common/DialogModal'
import UploadFileModal from '../common/UploadFileModal'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    overflow: 'scroll',
    height: '100vh',
    minHeight: 200,
  },
  headerContainer: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(8),
  },
  projectList: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(9),
    maxHeight: 500,
  },
  dividerContainer: {
    marginTop: theme.spacing(1.5),
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sortIcon: {
    cursor: 'pointer',
    fontSize: 22,
  },
  listHeader: {
    marginLeft: theme.spacing(2),
  },
  pathHeader: {
    cursor: 'pointer',
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(8),
  },
  buttonContainer: {
    paddingLeft: theme.spacing(8.5),
  },
  button: {
    fontSize: 24,
    cursor: 'pointer',
  },
  actionText: {
    paddingRight: theme.spacing(2),
  }
}), { name: 'FoldersList' })

const FoldersList = ({ header }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { params: { projectId } } = useRouteMatch()
  const { location: { search }, push } = useHistory()
  const folders = useSelector(getFoldersList)
  const isUpdatingFolders = useSelector(getIsCreatingFolder)
  const isLoading = useSelector(getIsLoading)

  useEffect(() => {
    if (isUpdatingFolders && !isLoading) {
      dispatch(fetchFoldersList(projectId, folderId))
      dispatch(clearFolderStatus())
    }
  }, [dispatch, isUpdatingFolders])

  const [openCreateFolderDialog, setOpenCreateFolderDialog] = useState(false)
  const [openUploadSourceFileDialog, setOpenUploadSourceFileDialog] = useState(false)
  const [entityType, setEntityType] = useState('File')

  const { folderId } = parse(search)
  const onRedirectToProjects = () => push('/projects')

  const onBackButtonClick = () => {
    // @ts-ignore
    const folderIdPath = folderId.split('/').filter(Boolean)
    const path = `${folderIdPath.slice(0, folderIdPath.length - 1).join('/')}`
    const currentPath = path ? `&folderId=${path}/` : ''

    push({
      pathname: `/project/${projectId}`,
      search: `${currentPath}`,
    })
  }

  const handleFolderSave = ({ folderName, targetLanguage }: any) => {
    dispatch(createFolder(projectId, folderId, folderName, targetLanguage))
    setOpenCreateFolderDialog(false)
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
        <Typography variant="h6" onClick={onRedirectToProjects} className={classes.pathHeader}>
          Projects
        </Typography>
      </Grid>
      <Grid container item className={classes.headerContainer}>
        <Typography variant="h1">{header}</Typography>
      </Grid>
      <Grid container item className={classes.buttonContainer}>
        <IconButton onClick={onBackButtonClick} disabled={!Boolean(folderId)} aria-label="back">
          <KeyboardBackspace className={classes.button} />
        </IconButton>
        <IconButton onClick={() => {
          setEntityType('File');
          setOpenCreateFolderDialog(true);
        }}>
          <NoteAdd className={classes.button} />
        </IconButton>
        <IconButton onClick={() => {
          setEntityType('Folder');
          setOpenCreateFolderDialog(true);
        }}>
          <CreateNewFolder className={classes.button} />
        </IconButton>
        <IconButton onClick={() => {
          setOpenUploadSourceFileDialog(true);
        }}>
          <SaveAlt className={classes.button} />
        </IconButton>
      </Grid>
      <Grid container item className={classes.projectList} alignItems="center">
        <Grid container justify="space-between" className={classes.listHeader}>
          <Grid container item md={2} alignItems="center">
            <Typography variant="h3">Name</Typography>
            <IconButton aria-label="sort">
              <Sort className={classes.sortIcon} />
            </IconButton>
          </Grid>
          <Grid
            container
            md={2}
            item
            justify="flex-end"
            alignItems="center"
          >
            <Typography className={classes.actionText} variant="h3">Action</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.dividerContainer}>
          <Divider />
        </Grid>
        {folders.map((folder: object) => <Folder key={uuid()} {...folder} />)}
      </Grid>
      <DialogModal
        itemType = {entityType}
        open={openCreateFolderDialog}
        onClose={() => setOpenCreateFolderDialog(false)}
        onSave={handleFolderSave}
      />
      <UploadFileModal
        itemType = {entityType}
        open={openUploadSourceFileDialog}
        onClose={() => setOpenUploadSourceFileDialog(false)}
        onSave={() => setOpenUploadSourceFileDialog(false)}
      />
    </Grid>
  )
}

export default FoldersList
