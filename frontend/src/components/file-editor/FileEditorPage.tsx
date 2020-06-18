import { Grid } from '@material-ui/core';
import { parse } from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { fetchProjectItemsList, getFilesList, reverseProjectItemsList } from '../../store/duck/projectItems';
import { Item, ProjectItem } from '../../store/entities';
import { getParentFolderPath } from '../../utils/pathNavigation';
import LeftPanel from '../common/LeftPanel';
import FileEditor from './FileEditor';

const FileEditorPage = () => {
  const dispatch = useDispatch();
  const { location: { search }, push } = useHistory();
  const { params: { projectId } } = useRouteMatch();
  const { fileId = '' } = parse(search);
  const folderPath = getParentFolderPath(fileId as string);
  const files: ProjectItem[] = useSelector(getFilesList);

  const onFileClick = (item: Item) => {
    if (item.readonly) {
      return;
    }
    push({
      search:`?fileId=${item.id}`,
      pathname: `/project/${projectId}/file`,
    });
  };

  const sortProjectItems = ():void => {
    dispatch(reverseProjectItemsList());
  };

  useEffect(() => {
    if (projectId && folderPath) {
      dispatch(fetchProjectItemsList(projectId, `${folderPath}/`));
    }
  }, [dispatch, folderPath]);

  return (
    <Grid container>
      <LeftPanel
        items={files}
        searchLabel="Files"
        onItemClick={onFileClick}
        onSortClick={sortProjectItems}
      />
      <FileEditor />
    </Grid>
  );
};

export default FileEditorPage;
