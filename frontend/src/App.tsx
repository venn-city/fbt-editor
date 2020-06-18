import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { CssBaseline, makeStyles } from '@material-ui/core'

import ProjectsPage from './components/projects/ProjectsPage'
import NoPermissionPage from './components/NoPermissionPage'
import FoldersPage from './components/folders/FoldersPage'
import FileEditorPage from './components/file-editor/FileEditorPage'

const useStyles = makeStyles(theme => ({
  page: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}), { name: 'App' })

const App = () => {
  const classes = useStyles()
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.page}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to="/projects" />} />
            <Route component={NoPermissionPage} path="/403" />
            <Route component={ProjectsPage} path="/projects" />
            <Route component={FileEditorPage} path='/project/:projectId/file' />
            <Route component={FoldersPage} path="/project/:projectId" />
          </Switch>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
