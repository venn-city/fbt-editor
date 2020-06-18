import { Grid, makeStyles, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { updateFileContentField } from '../../store/duck/fileContent';
import { ProjectFileItem } from '../../store/entities';

const useStyles = makeStyles(theme => ({
  rowContainer: {
    marginTop: theme.spacing(4),
  },
}), { name: 'FileContentRow' });

interface FileContentRowProps {
  projectFileItem: ProjectFileItem;
  targetLanguage: string;
  sourceLanguage: string;
}

const FileContentRow = ({ projectFileItem, targetLanguage, sourceLanguage }: FileContentRowProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [sourceRow, setSourceRow] = useState(projectFileItem.source);
  const [targetRow, setTargetRow] = useState(projectFileItem.target);
  const [descriptionRow, setDescriptionRow] = useState(projectFileItem.description);

  const [debouncedSourceRow] = useDebounce(sourceRow, 1000);
  const [debouncedTargetRow] = useDebounce(targetRow, 1000);
  const [debouncedDescriptionRow] = useDebounce(descriptionRow, 1000);

  useEffect(() => {
    setTargetRow(projectFileItem.target);
  }, [projectFileItem.target]);

  useEffect(() => {
    if (debouncedTargetRow !== projectFileItem.target) {
      dispatch(updateFileContentField({ id : projectFileItem.id, value: debouncedTargetRow }));
    }
  }, [debouncedSourceRow, debouncedTargetRow, debouncedDescriptionRow, dispatch, projectFileItem]);

  return (
    <Grid container item className={classes.rowContainer} justify="center" key={projectFileItem.id} spacing={3}>
      <Grid container item md>
        <TextField
          fullWidth
          multiline
          InputProps={{
            readOnly: true,
          }}
          label={sourceLanguage}
          rows={3}
          value={sourceRow}
          variant="outlined"
          onChange={({ target: { value } }: any) => setSourceRow(value)}
        />
      </Grid>
      <Grid container item md>
        <TextField
          fullWidth
          multiline
          label={targetLanguage}
          rows={3}
          value={targetRow}
          variant="outlined"
          onChange={({ target: { value } }: any) => setTargetRow(value)}
        />
      </Grid>
      <Grid container item md={3}>
        <TextField
          fullWidth
          multiline
          label="Description"
          rows={3}
          value={descriptionRow}
          variant="outlined"
          onChange={({ target: { value } }: any) => setDescriptionRow(value)}
        />
      </Grid>
    </Grid>
  );
};

export default FileContentRow;
