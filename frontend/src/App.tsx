import { CssBaseline, makeStyles } from "@material-ui/core";
import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ErrorSnackbar from "./components/ErrorSnackbar";
import FileEditorPage from "./components/file-editor/FileEditorPage";
import withAuthentication from "./components/hocs/withAuthentication";
import LoginPage from "./components/LoginPage";
import NoPermissionPage from "./components/NoPermissionPage";
import ProjectItemsPage from "./components/projectItems/ProjectItemsPage";
import ProjectsPage from "./components/projects/ProjectsPage";

const useStyles = makeStyles(
  (theme) => ({
    page: {
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
  }),
  { name: "App" }
);

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
              component={withAuthentication(<Redirect to="/projects" />)}
              path="/"
            />
            <Route component={NoPermissionPage} path="/403" />
            <Route component={LoginPage} path="/login" />
            <Route
              component={withAuthentication(ProjectsPage)}
              path="/projects"
            />
            <Route
              component={withAuthentication(FileEditorPage)}
              path="/project/:projectId/file"
            />
            <Route
              component={withAuthentication(ProjectItemsPage)}
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
