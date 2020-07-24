import { Grid } from "@material-ui/core";
import { parse } from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { fetchProjectItemsList } from "../../store/duck/projectItems";
import {
  fetchProjectsList,
  getProjectsList,
  reverseProjectsList,
} from "../../store/duck/projects";
import { Item, Project } from "../../store/entities";
import { getProjectPath } from "../../utils/pathNavigation";
import LeftPanel from "../common/LeftPanel";
import FoldersList from "./ProjectItemsList";

const ProjectItemsPage = () => {
  const {
    location: { search },
    push,
  } = useHistory();
  const dispatch = useDispatch();
  const { folderId } = parse(search);
  const {
    params: { projectId },
  } = useRouteMatch();
  const projects: Project[] = useSelector(getProjectsList);

  useEffect(() => {
    if (projectId || folderId) {
      dispatch(fetchProjectItemsList(projectId, folderId as string));
    }
  }, [dispatch, projectId, folderId]);

  useEffect(() => {
    dispatch(fetchProjectsList());
  }, [dispatch]);

  const onProjectClick = (item: Item) => {
    push({ pathname: getProjectPath(item.id) });
  };

  const onChangeSortProejcts = (): void => {
    dispatch(reverseProjectsList());
  };

  return (
    <Grid container>
      <LeftPanel
        items={projects}
        searchLabel="Projects"
        onItemClick={onProjectClick}
        onSortClick={onChangeSortProejcts}
      />
      <FoldersList header={projectId} />
    </Grid>
  );
};

export default ProjectItemsPage;
