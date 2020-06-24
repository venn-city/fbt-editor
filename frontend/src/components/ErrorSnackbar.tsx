import { Snackbar } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLastError, getLastError } from '../store/duck/errors';

const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { message = '', status = 0 } = useSelector(getLastError);

  // @ts-ignore
  useEffect(() => {
    if (message && status > 0) {
      setOpen(true);
    }
  }, [message, status]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearLastError());
  };

  return (

    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={5000}
      open={open}
      onClose={handleClose}
    >
      <Alert severity="error" onClose={handleClose}>
        <AlertTitle>{message} - {status}</AlertTitle>
      </Alert>
    </Snackbar>
  );
};

// @ts-ignore
export default ErrorSnackbar;
