import React, { useEffect, useState } from 'react'
import { Grid, makeStyles, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { useDebounce } from 'use-debounce'

import { updateFileContentField } from '../../store/duck/fileContent'

const useStyles = makeStyles(theme => ({
  rowContainer: {
    marginTop: theme.spacing(4),
  },
}), { name: 'FileContentRow' })

const FileContentRow = ({ id, source, target, description }: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [sourceRow, setSourceRow] = useState(source)
  const [targetRow, setTargetRow] = useState(target)
  const [descriptionRow, setDescriptionRow] = useState(description)

  const [debouncedSourceRow] = useDebounce(sourceRow, 1000)
  const [debouncedTargetRow] = useDebounce(targetRow, 1000)
  const [debouncedDescriptionRow] = useDebounce(descriptionRow, 1000)

  useEffect(() => {
    setTargetRow(target)
  }, [target])

  useEffect(() => {
    if (debouncedSourceRow !== source) {
      dispatch(updateFileContentField({ id, value: debouncedSourceRow, field: 'source' }))
    }
    if (debouncedTargetRow !== target) {
      dispatch(updateFileContentField({ id, value: debouncedTargetRow, field: 'target' }))
    }
    if (debouncedDescriptionRow !== description) {
      dispatch(updateFileContentField({ id, value: debouncedDescriptionRow, field: 'description' }))
    }
  }, [debouncedSourceRow, debouncedTargetRow, debouncedDescriptionRow])

  return (
    <Grid key={id} container item spacing={3} justify="center" className={classes.rowContainer}>
      <Grid container item md>
        <TextField
          multiline
          label="English"
          fullWidth
          value={sourceRow}
          onChange={({ target: { value } }: any) => setSourceRow(value)}
          rows={3}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </Grid>
      <Grid container item md>
        <TextField
          multiline
          fullWidth
          value={targetRow}
          rows={3}
          label="English"
          onChange={({ target: { value } }: any) => setTargetRow(value)}
          variant="outlined"
        />
      </Grid>
      <Grid container item md={3}>
        <TextField
          multiline
          fullWidth
          value={descriptionRow}
          onChange={({ target: { value } }: any) => setDescriptionRow(value)}
          rows={3}
          label="Description"
          variant="outlined"
        />
      </Grid>
    </Grid>
  )
}

export default FileContentRow
