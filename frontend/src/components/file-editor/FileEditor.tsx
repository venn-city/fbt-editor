import { Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import langmap from "langmap";
import { parse } from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  clearFileContent,
  fetchFileContent,
  getFileContentList,
  getFilteredContentList,
  getIsLoading,
  getTargetLanguage,
  updateFileContent,
} from "../../store/duck/fileContent";
import { ProjectFileItem } from "../../store/entities";
import {
  getCurrentFileName,
  getProjectItemParentFolderPath,
} from "../../utils/pathNavigation";
import useCloseAfterCreation from "../../utils/useCloseAfterCreation";
import FileContentRow from "./FileContentRow";
import SearchContent from "./SearchContent";

const useStyles = makeStyles(
  theme => ({
    root: {
      backgroundColor: "#bbdef7",
    },
    headerContainer: {
      marginTop: theme.spacing(1),
      paddingLeft: theme.spacing(8),
      height: 52,
    },
    pathHeader: {
      cursor: "pointer",
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(8),
    },
    fileContent: {
      maxHeight: "80vh",
      overflow: "scroll",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(8),
      marginRight: theme.spacing(8),
      flexDirection: "column",
      alignItems: "center",
      padding: theme.spacing(0, 3, 6),
    },
    actions: {
      marginRight: theme.spacing(8),
    },
    saveButton: {
      color: "#fff",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      },
    },
    cancelButton: {
      color: "rgba(0, 0, 0, 0.7)",
      backgroundColor: "#bbdef7",
      border: "1px solid rgba(0, 0, 0, 0.6)",
      "&:hover": {
        backgroundColor: "#bbe4f7",
      },
    },
  }),
  { name: "FileEditor" },
);

const FileEditor = () => {
  const classes = useStyles();
  const {
    location: { search },
    push,
  } = useHistory();
  const { fileId = "" } = parse(search);
  const dispatch = useDispatch();
  const fileContentList = useSelector(getFileContentList);
  const filteredFileContentList = useSelector(getFilteredContentList);
  const currentTargetLanguage = useSelector(getTargetLanguage);
  const isLoading = useSelector(getIsLoading);
  const {
    params: { projectId },
  } = useRouteMatch();

  const contentList = filteredFileContentList.length
    ? filteredFileContentList
    : fileContentList;

  const backToCurrentFolder = () => {
    const search = getProjectItemParentFolderPath(fileId as string);
    push({
      pathname: `/project/${projectId}`,
      search,
    });
  };

  const onRedirectToProjects = () => push("/projects");

  const onSaveFileContent = () => {
    dispatch(
      updateFileContent(
        projectId,
        fileId as string,
        currentTargetLanguage,
        fileContentList,
      ),
    );
    redirectToCurrentFolder();
  };
  const targetLanguageName = currentTargetLanguage
    ? langmap[currentTargetLanguage.replace("_", "-")]?.englishName
    : "";

  const redirectToCurrentFolder = useCloseAfterCreation(
    backToCurrentFolder,
    getIsLoading,
  );
  const currentFileName = getCurrentFileName(fileId as string);

  useEffect(() => {
    if (projectId || fileId) {
      dispatch(clearFileContent());
      dispatch(fetchFileContent(projectId, fileId as string));
    }
  }, [dispatch, projectId, fileId]);

  return (
    <Grid
      container
      item
      md
      className={classes.root}
      direction="column"
      justify="flex-start"
    >
      <Grid container item>
        <Typography
          className={classes.pathHeader}
          variant="h6"
          onClick={onRedirectToProjects}
        >
          Projects
        </Typography>
      </Grid>
      <Grid container item className={classes.headerContainer}>
        <Grid container item md>
          <Typography variant="h1">{currentFileName}</Typography>
        </Grid>
        <SearchContent />
        <Grid
          container
          item
          alignItems="center"
          className={classes.actions}
          justify="flex-end"
          md={2}
          spacing={1}
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
      {contentList.length > 0 && (
        <Paper className={classes.fileContent} elevation={6}>
          {contentList.map((projectFileItem: ProjectFileItem) => (
            <FileContentRow
              key={projectFileItem.id}
              projectFileItem={projectFileItem}
              sourceLanguage="Source language"
              targetLanguage={targetLanguageName}
            />
          ))}
        </Paper>
      )}
    </Grid>
  );
};

export default FileEditor;
