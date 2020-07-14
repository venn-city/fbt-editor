import { CssBaseline, makeStyles } from '@material-ui/core';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import ErrorSnackbar from './components/ErrorSnackbar';
import FileEditorPage from './components/file-editor/FileEditorPage';
import withAuthentification from './components/hocs/withAuthentification';
import LoginPage from './components/LoginPage';
import NoPermissionPage from './components/NoPermissionPage';
import ProjectItemsPage from './components/projectItems/ProjectItemsPage';
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
              component={withAuthentification(<Redirect to="/projects" />)}
              path="/"
            />
            <Route
              component={NoPermissionPage}
              path="/403"
            />
            <Route
              component={LoginPage}
              path="/login"
            />
            <Route
              component={withAuthentification(ProjectsPage)}
              path="/projects"
            />
            <Route
              component={withAuthentification(FileEditorPage)}
              path="/project/:projectId/file"
            />
            <Route
              component={withAuthentification(ProjectItemsPage)}
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
