import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {
  CreateNewFolder,
  KeyboardBackspace,
  NoteAdd,
  SaveAlt,
  Sort,
} from "@material-ui/icons";
import { parse } from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  clearProjectItemStatus,
  createProjectItem,
  fetchProjectItemsList,
  getIsCreatingProjectItem,
  getIsLoading,
  getProjectItemsList,
  reverseProjectItemsList,
  uploadSourceFile,
} from "../../store/duck/projectItems";
import {
  CreateItemRequest,
  ProjectItem,
  ProjectItemType,
} from "../../store/entities";
import {
  getProjectItemParentFolderPath,
  getProjectPath,
} from "../../utils/pathNavigation";
import CreateProjectItemModal from "../common/CreateProjectItemModal";
import UploadFileModal from "../common/UploadFileModal";
import ProjectListItem from "./ProjectListItem";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      backgroundColor: "#bbdef7",
      overflow: "scroll",
      height: "100vh",
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
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    sortIcon: {
      cursor: "pointer",
      fontSize: 22,
    },
    listHeader: {
      marginLeft: theme.spacing(2),
    },
    pathHeader: {
      cursor: "pointer",
      paddingTop: theme.spacing(4),
      paddingLeft: theme.spacing(8),
    },
    buttonContainer: {
      paddingLeft: theme.spacing(8.5),
    },
    button: {
      fontSize: 24,
      cursor: "pointer",
    },
    actionText: {
      paddingRight: theme.spacing(2),
    },
  }),
  { name: "ProjectItemsList" }
);

interface ProjectItemsListProps {
  header: string;
}

const ProjectItemsList = ({ header }: ProjectItemsListProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { projectId },
  } = useRouteMatch();
  const {
    location: { search },
    push,
  } = useHistory();
  const projectItems: ProjectItem[] = useSelector(getProjectItemsList);
  const isUpdatingProjectItems = useSelector(getIsCreatingProjectItem);
  const isLoading = useSelector(getIsLoading);

  const { folderId } = parse(search);

  useEffect(() => {
    if (isUpdatingProjectItems && !isLoading) {
      dispatch(fetchProjectItemsList(projectId, folderId as string));
      dispatch(clearProjectItemStatus());
    }
  }, [dispatch, isUpdatingProjectItems, projectId, folderId, isLoading]);

  const [
    openCreateProjectItemDialog,
    setOpenCreateProjectItemDialog,
  ] = useState(false);
  const [openUploadSourceFileDialog, setOpenUploadSourceFileDialog] = useState(
    false
  );
  const [projectItemType, setProjectItemType] = useState(ProjectItemType.File);

  const onRedirectToProjects = () => push("/projects");

  const onBackButtonClick = () => {
    const search = getProjectItemParentFolderPath(folderId as string);
    push({
      pathname: getProjectPath(projectId),
      search: search,
    });
  };

  const sortProjectItems = (): void => {
    dispatch(reverseProjectItemsList());
  };

  const handleProjectItemSave = (
    name: string,
    targetLanguage: string | undefined
  ) => {
    dispatch(
      createProjectItem({
        projectId,
        parentFolderId: folderId,
        name,
        targetLanguage,
      } as CreateItemRequest)
    );
    setOpenCreateProjectItemDialog(false);
  };

  const handleUploadFile = (file: any) => {
    var formData = new FormData();
    formData.set("projectId", projectId);
    formData.set("parentFolderId", folderId?.toString() || "");
    formData.append("file", file);
    dispatch(uploadSourceFile(formData));
    setOpenUploadSourceFileDialog(false);
  };

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
        <Typography variant="h1">{header}</Typography>
      </Grid>
      <Grid container item className={classes.buttonContainer}>
        <IconButton
          aria-label="back"
          disabled={!folderId}
          onClick={onBackButtonClick}
        >
          <KeyboardBackspace className={classes.button} />
        </IconButton>
        <IconButton
          onClick={() => {
            setProjectItemType(ProjectItemType.File);
            setOpenCreateProjectItemDialog(true);
          }}
        >
          <NoteAdd className={classes.button} />
        </IconButton>
        <IconButton
          onClick={() => {
            setProjectItemType(ProjectItemType.Folder);
            setOpenCreateProjectItemDialog(true);
          }}
        >
          <CreateNewFolder className={classes.button} />
        </IconButton>
        <IconButton
          onClick={() => {
            setOpenUploadSourceFileDialog(true);
          }}
        >
          <SaveAlt className={classes.button} />
        </IconButton>
      </Grid>
      <Grid container item alignItems="center" className={classes.projectList}>
        <Grid container className={classes.listHeader} justify="space-between">
          <Grid container item alignItems="center" md={2}>
            <Typography variant="h3">Name</Typography>
            <IconButton aria-label="sort">
              <Sort className={classes.sortIcon} onClick={sortProjectItems} />
            </IconButton>
          </Grid>
          <Grid container item alignItems="center" justify="flex-end" md={2}>
            <Typography className={classes.actionText} variant="h3">
              Action
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.dividerContainer}>
          <Divider />
        </Grid>
        {projectItems.map((projectItem: ProjectItem) => (
          <ProjectListItem key={projectItem.id} projectItem={projectItem} />
        ))}
      </Grid>
      <CreateProjectItemModal
        open={openCreateProjectItemDialog}
        projectItemType={projectItemType}
        onClose={() => setOpenCreateProjectItemDialog(false)}
        onSave={handleProjectItemSave}
      />
      <UploadFileModal
        open={openUploadSourceFileDialog}
        onClose={() => setOpenUploadSourceFileDialog(false)}
        onSave={handleUploadFile}
      />
    </Grid>
  );
};

export default ProjectItemsList;
