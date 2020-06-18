import React from 'react'
import {
  Grid,
  makeStyles,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  FilledInput,
  Typography,
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e3f2fb',
    height: '100vh',
    width: 300,
  },
  searchContainer: {
    marginTop: theme.spacing(7),
  },
  searchLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.40)',
    lineHeight: '12px',
  },
  input: {
    width: 254,
  },
  sortIcon: {
    fontSize: '1.4rem',
  },
  filledInput: {
    height: 48,
    fontSize: '1.6rem',
    borderRadius: '4px 4px 0 0',
    backgroundColor: '#fff',
    '&:not(:hover)': {
      backgroundColor: '#fff',
    },
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  listFilesContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    width: 300,
    maxHeight: '70vh',
    overflow: 'auto',
  },
  text: {
    cursor: 'pointer',
    minWidth: 254,
    fontSize: '14px',
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  footerContainer: {
    marginLeft: 26,
    marginBottom: 20,
  },
}), { name: 'LeftPanel' })

const LeftPanel = ({ searchLabel = 'Recent files', files = [], onSortClick, onItemClick }: any) => {
  const classes = useStyles()
  return (
    <Grid
      item
      container
      direction="column"
      justify="space-between"
      className={classes.root}
    >
      <Grid
        item
        container
        justify="center"
        className={classes.searchContainer}
      >
        <FormControl variant="filled" classes={{ root: classes.input }}>
          <InputLabel classes={{ root: classes.searchLabel }}>
            {searchLabel}
          </InputLabel>
          <FilledInput
            disabled
            disableUnderline
            classes={{ root: classes.filledInput }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={onSortClick}
                  edge="end"
                >
                  <SortIcon className={classes.sortIcon} />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Grid container item className={classes.listFilesContainer}>
          {files.map((file: any) =>
            <Typography onClick={() => onItemClick(file.id)} key={file.id} variant="body2" className={classes.text}>
              {file.id}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LeftPanel
