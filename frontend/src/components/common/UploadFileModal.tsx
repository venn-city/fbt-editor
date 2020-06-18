import React, { useState } from 'react'
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  DialogContentText,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
  },
  button: {},
  saveButton: {},
  targetLanguage: {
    marginTop: theme.spacing(2),
  }
}), { name: 'DialogModal' })

const UploadFileModal = ({ itemType, open, onClose, onSave }: any) => {
  const classes = useStyles()
  const [file, setFile] = useState('')

  const onFormSubmit = (e:any) : void => {
    e.preventDefault();
    // post data
  }

  const onChange = (e:any) => {
  }

  const fileUpload = (file: any) =>  {
    const formData = new FormData();
    formData.append('file', file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
  }
  
  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={onClose}
    >
      <form onSubmit={onFormSubmit}>
      <DialogTitle>Upload source file</DialogTitle>
      <DialogContent>
        <Input
          value={file}
          onChange={({ target: { value } }) => setFile(value)}
          autoFocus
          type='file'
        />
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => {
            onClose()
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          className={classes.saveButton}
          color="inherit"
          onClick={(e) => {
            onFormSubmit(e)
          }}
          variant="outlined"
        >
          Save
        </Button>
      </DialogActions>
      </form>
    </Dialog>
  )
}

export default UploadFileModal
