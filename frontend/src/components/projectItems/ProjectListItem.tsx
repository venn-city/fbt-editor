import { Grid, Link, makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { FolderOpen, InsertDriveFile } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteProjectItem, getIsLoading } from "../../store/duck/projectItems";
import { ProjectItem, ProjectItemType } from "../../store/entities";
import {
  getFilePath,
  getFolderPath,
  getProjectPath,
} from "../../utils/pathNavigation";
import ControlButtonGroup from "../common/ControlButtonGroup";

const useStyles = makeStyles(
  theme => ({
    root: {
      backgroundColor: "#bbdef7",
      paddingTop: theme.spacing(0.5),
      paddingLeft: theme.spacing(2),
    },
    dividerContainer: {
      marginTop: theme.spacing(0.5),
      height: 1,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
    },
    folderNameText: {
      fontWeight: 400,
    },
    icon: {
      fontSize: 20,
      marginRight: 10,
    },
  }),
  { name: "Folder" },
);

export interface ProjectItemProps {
  projectItem: ProjectItem;
}

const ProjectListItem = ({ projectItem }: ProjectItemProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    params: { projectId },
  } = useRouteMatch();
  const isLoading = useSelector(getIsLoading);
  const { push } = useHistory();

  const isFile = projectItem.type === ProjectItemType.File;
  const removeButtonTooltip = isFile ? "Remove file" : "Remove folder";

  const deleteAction = () =>
    dispatch(
      deleteProjectItem({
        projectId,
        itemId: projectItem.id,
      }),
    );

  const onEntityClick = (search: string, method: any, additionalPath = "") => {
    method({
      search,
      pathname: `${getProjectPath(projectId)}${additionalPath}`,
    });
  };
  const onFolderClick = (folderId: string) =>
    onEntityClick(getFolderPath(folderId), push);
  const onFileClick = (fileId: string) =>
    onEntityClick(getFilePath(fileId), push, "/file");

  const onItemClick = () => {
    if (projectItem.readonly) {
      return;
    }
    isFile ? onFileClick(projectItem.id) : onFolderClick(projectItem.id);
  };

  return (
    <Grid container item className={classes.root} justify="space-between">
      <Grid container item md alignItems="center">
        {isFile ? (
          <InsertDriveFile classes={{ root: classes.icon }} />
        ) : (
          <FolderOpen classes={{ root: classes.icon }} />
        )}
        <Link
          className={classes.folderNameText}
          component="button"
          variant="body2"
          onClick={onItemClick}
        >
          {projectItem.name}
        </Link>
      </Grid>
      <Grid item>
        <ControlButtonGroup
          buttons={[
            isFile &&
              !projectItem.readonly && {
              name: "edit",
              onClick: () => onFileClick(projectItem.id),
              tooltip: "Edit file",
            },
            {
              name: "delete",
              onClick: deleteAction,
              tooltip: removeButtonTooltip,
              isLoading,
            },
          ]}
        />
      </Grid>
      <Grid container className={classes.dividerContainer}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default ProjectListItem;
