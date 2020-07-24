import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles(
  (theme) => ({
    root: {
      width: 500,
    },
    button: {},
    saveButton: {},
    targetLanguage: {
      marginTop: theme.spacing(2),
    },
  }),
  { name: "CreataProjectItemModal" }
);

export interface UploadFileModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (currentFile: File | undefined) => void;
}

const UploadFileModal = ({ open, onClose, onSave }: UploadFileModalProps) => {
  const classes = useStyles();
  const [currentFile, setCurrentFile] = useState<File>();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target!.files) {
      setCurrentFile(event.target!.files[0]);
    }
  };

  return (
    <Dialog classes={{ paper: classes.root }} open={open} onClose={onClose}>
      <form>
        <DialogTitle>Upload source file</DialogTitle>
        <DialogContent>
          <input id="file" type="file" onChange={selectFile} />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.button}
            variant="outlined"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            className={classes.saveButton}
            color="inherit"
            variant="outlined"
            onClick={() => onSave(currentFile)}
          >
            Upload
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadFileModal;
