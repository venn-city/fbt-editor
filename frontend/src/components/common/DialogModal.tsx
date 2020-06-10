import React, { useState } from 'react'
import {
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
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

const DialogModal = ({ itemType, open, onClose, onSave }: any) => {
  const classes = useStyles()
  const [folderName, setFolderName] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('')
  const isFile = itemType === 'File'
  const dialogContentText = `Enter a ${itemType.toLowerCase()} name ${isFile ? 'and target language' : ''} below:`

  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle>{itemType} creating</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {dialogContentText}
        </DialogContentText>
        <TextField
          value={folderName}
          onChange={({ target: { value } }) => setFolderName(value)}
          autoFocus
          label={`${itemType} name`}
          fullWidth
        />
        {isFile && (
          <TextField
            className={classes.targetLanguage}
            value={targetLanguage}
            onChange={({ target: { value } }) => setTargetLanguage(value)}
            fullWidth
            label="Target language"
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => {
            onClose()
            setFolderName('')
            setTargetLanguage('')
          }}
          variant="outlined"
        >
          Cancel
        </Button>
        <Button
          className={classes.saveButton}
          color="inherit"
          onClick={() => {
            onSave({ folderName, targetLanguage })
            setFolderName('')
            setTargetLanguage('')
          }}
          variant="outlined"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogModal
