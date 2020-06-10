import React from 'react'
import { Grid, makeStyles, Typography, } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'

import ControlButtonGroup from '../common/ControlButtonGroup'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    paddingLeft: theme.spacing(2.5),
  },
  dividerContainer: {
    marginTop: theme.spacing(0.5),
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    fontSize: 14,
    fontWeight: 400,
  },
  listHeader: {
    marginLeft: theme.spacing(2),
  },
  fileItem: {
    marginTop: theme.spacing(0.5),
  }
}), { name: 'FilesList' })

const FilesList = ({ files }: any) => {
  const classes = useStyles()

  return (
    <Grid
      md
      container
      item
      direction="column"
      justify="flex-start"
      className={classes.root}
    >
      {files.map(({ name, id }: any) => {
        return (
          <Grid key={id}>
            <Grid
              container
              item
              md
              className={classes.fileItem}
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography variant="h3" className={classes.text}>{name}</Typography>
              </Grid>
              <Grid item>
                <ControlButtonGroup
                  buttons={
                    [
                      { name: 'edit', onClick: () => console.log('editFile', id), tooltip: 'Edit' },
                      { name: 'delete', onClick: () => console.log('deleteFile', id), tooltip: 'Delete' },
                    ]
                  }
                />
              </Grid>
            </Grid>
            <Grid container className={classes.dividerContainer}>
              <Divider />
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default FilesList
