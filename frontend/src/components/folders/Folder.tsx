import React from 'react'
import { Grid, Link, makeStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import { FolderOpen, InsertDriveFile } from '@material-ui/icons'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ControlButtonGroup from '../common/ControlButtonGroup'
import { deleteFolder, getIsLoading } from '../../store/duck/folders'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    paddingTop: theme.spacing(0.5),
    paddingLeft: theme.spacing(2),
  },
  dividerContainer: {
    marginTop: theme.spacing(0.5),
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  folderNameText: {
    fontWeight: 400,
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
  },
}), { name: 'Folder' })

const Folder = ({ name, id, type }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { params: { projectId } } = useRouteMatch()
  const isLoading = useSelector(getIsLoading)
  const { push } = useHistory()

  const isFile = type === 'File'
  const removeButtonTooltip = isFile
    ? 'Remove file'
    : 'Remove folder'

  const deleteAction = () => dispatch(deleteFolder(projectId, id))

  const onEntityClick = (search: string, method: any, additionalPath = '') => {
    method({
      search,
      pathname: `/project/${projectId}${additionalPath}`,
    })
  }
  const onFolderClick = (folderId: string) => onEntityClick(`?folderId=${folderId}`, push)
  const onFileClick = (fileId: string) => onEntityClick(`?fileId=${fileId}`, push, '/file')


  return (
    <Grid container item justify="space-between" className={classes.root}>
      <Grid container item alignItems="center" md>
        {isFile
          ? <InsertDriveFile classes={{ root: classes.icon }} />
          : <FolderOpen classes={{ root: classes.icon }} />
        }
        <Link
          className={classes.folderNameText}
          component="button"
          variant="body2"
          onClick={() => isFile ? onFileClick(id) : onFolderClick(id)}
        >
          {name}
        </Link>
      </Grid>
      <Grid item>
        <ControlButtonGroup
          buttons={
            [
              isFile && { name: 'edit', onClick: () => onFileClick(id), tooltip: 'Edit file' },
              {
                name: 'delete',
                onClick: deleteAction,
                tooltip: removeButtonTooltip,
                isLoading,
              },
            ]
          }
        />
      </Grid>
      <Grid container className={classes.dividerContainer}>
        <Divider />
      </Grid>
    </Grid>
  )
}

export default Folder
