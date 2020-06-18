import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ErrorSnackbar from './components/ErrorSnackbar';
import FileEditorPage from './components/file-editor/FileEditorPage';
import ProjectItemsPage from './components/projectItems/ProjectItemsPage';
import NoPermissionPage from './components/NoPermissionPage';
import ProjectsPage from './components/projects/ProjectsPage';

const useStyles = makeStyles(theme => ({
  page: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}), { name: 'App' });

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.page}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/projects" />}
            />
            <Route
              component={NoPermissionPage}
              path="/403"
            />
            <Route
              component={ProjectsPage}
              path="/projects"
            />
            <Route
              component={FileEditorPage}
              path="/project/:projectId/file"
            />
            <Route
              component={ProjectItemsPage}
              path="/project/:projectId"
            />
          </Switch>
          <ErrorSnackbar />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
