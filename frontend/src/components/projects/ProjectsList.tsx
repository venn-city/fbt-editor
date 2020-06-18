import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid, makeStyles, Typography, } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import SortIcon from '@material-ui/icons/Sort'

import ListItem from './ListItem'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    height: '100vh',
    overflow: 'scroll',
  },
  headerContainer: {
    marginTop: theme.spacing(7),
    paddingLeft: theme.spacing(8),
  },
  projectList: {
    marginTop: theme.spacing(4.5),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(9),
  },
  dividerContainer: {
    marginTop: theme.spacing(1.5),
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  sortIcon: {
    cursor: 'pointer',
    marginLeft: 14,
    width: theme.spacing(2.5),
    height: theme.spacing(2.5),
  },
  listHeader: {
    marginLeft: 16,
  }
}), { name: 'ProjectsList' })

const ProjectsList = ({ projects }: any) => {
  const classes: any = useStyles()
  const history = useHistory()

  const onProjectClick = (name: string) => {
    history.push({ pathname: `/project/${name}` })
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
      <Grid container item className={classes.headerContainer}>
        <Typography variant='h1'>Projects</Typography>
      </Grid>
      <Grid container item className={classes.projectList}>
        <Grid container className={classes.listHeader} justify="space-between">
          <Grid container alignItems="center" item md={2}>
            <Typography variant="h3">Name</Typography>
            <SortIcon className={classes.sortIcon} />
          </Grid>
          <Grid container alignItems="center" item md={4}>
            <Typography variant="h3">Description</Typography>
          </Grid>
          <Grid container alignItems="center" item md={2}>
            <Typography variant="h3">Action</Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.dividerContainer}>
          <Divider className={classes.divider} />
        </Grid>
        {projects.map((project: any) =>
          <ListItem key={project.name} {...project} onItemClick={onProjectClick} />
        )}
      </Grid>
    </Grid>
  )
}

export default ProjectsList
