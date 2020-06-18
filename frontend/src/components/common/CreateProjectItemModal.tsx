import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import path from 'path';
import React, { useEffect, useState } from 'react';
import { ProjectItemType } from '../../store/entities';
import { getTargetLanguageDisplayName, getTargetLanguageItems } from '../../utils/targetLanguage';

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
  },
  button: {},
  saveButton: {},
  dialogContent: {
    overflow: 'initial',
  },
  targetLanguage: {
    marginTop: theme.spacing(2),
  },
}), { name: 'CreateProjectItemModal' });

export interface CreateProjectItemModalProps {
  projectItemType: ProjectItemType;
  open: boolean;
  onClose: () => void;
  onSave: (projectItemName: string, targetLanguage: string|undefined) => void
}

const CreateProjectItemModal = ({ projectItemType, open, onClose, onSave }: CreateProjectItemModalProps) => {
  const classes = useStyles();
  const [projectItemName, setProjectItemName] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const isFile = projectItemType === ProjectItemType.File;
  const dialogContentText = `Enter a ${projectItemType.toLowerCase()} name ${isFile ? 'and target language' : ''} below:`;
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

  useEffect(() => {
    if (isFile) {
      setIsSaveButtonDisabled(projectItemName === '' || path.extname(projectItemName) === '' || targetLanguage === '');
      return;
    }
    setIsSaveButtonDisabled(projectItemName === '');
  }, [projectItemName, targetLanguage, isFile]);

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{projectItemType} creating</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          required
          label={`${projectItemType} name`}
          value={projectItemName}
          onChange={({ target: { value } }) => setProjectItemName(value)}
        />
        {isFile && (
          <FormControl fullWidth className={classes.targetLanguage}>
            <InputLabel>Target language</InputLabel>
            <Select
              required
              value={targetLanguage}
              onChange={({ target: { value } }: any) => setTargetLanguage(value)}
            >
              {getTargetLanguageItems().map(({ code, name }) =>
                <MenuItem key={code} value={code}>{getTargetLanguageDisplayName(code, name)}</MenuItem>,
              )}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          variant="outlined"
          onClick={() => {
            onClose();
            setProjectItemName('');
            setTargetLanguage('');
          }}
        >
          Cancel
        </Button>
        <Button
          className={classes.saveButton}
          color="inherit"
          disabled={isSaveButtonDisabled}
          variant="outlined"
          onClick={() => {
            onSave(projectItemName, targetLanguage.replace('-', '_'));
            setProjectItemName('');
            setTargetLanguage('');
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProjectItemModal;
