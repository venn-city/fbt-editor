import { Grid } from '@material-ui/core';
import React, { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchProjectsList, getProjectsList } from '../../store/duck/projects';
import { fetchRecentFilesList, getRecentFilesList, reverseRecentFilesList } from '../../store/duck/recentFiles';
import { Item, RecentFile } from '../../store/entities';
import { onFileClick } from '../../utils/projectItemPath';
import LeftPanel from '../common/LeftPanel';
import ProjectsList from './ProjectsList';

const ProjectsPage = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const projects = useSelector(getProjectsList);
  const recentFiles: RecentFile[] = useSelector(getRecentFilesList);
  const { push } = useHistory();

  useEffect(() => {
    dispatch(fetchProjectsList());
    dispatch(fetchRecentFilesList());
  }, [dispatch]);

  const onChangeSortFiles = ():void => {
    dispatch(reverseRecentFilesList());
  };

  return (
    <Grid container>
      <LeftPanel
        items={recentFiles}
        searchLabel="Recent files"
        onItemClick={(item: Item) => onFileClick(item.projectId, item.id, push)}
        onSortClick={onChangeSortFiles}
      />
      <ProjectsList projects={projects} />
    </Grid>
  );
};

export default ProjectsPage;
