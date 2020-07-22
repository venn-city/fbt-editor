import {
  Avatar, FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import React, { useEffect } from 'react';
import { GoogleLogout } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchAuthClientData, getAuthClientData, getCurrentUser, getIsLoggedIn, logout } from '../../store/duck/auth';
import { CurrentUser, Item } from '../../store/entities';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#e3f2fb',
    height: '100vh',
    width: 300,
  },
  searchContainer: {
    marginTop: theme.spacing(7),
  },
  searchLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.40)',
    lineHeight: '16px',
  },
  input: {
    width: 254,
  },
  sortIcon: {
    fontSize: '1.4rem',
  },
  filledInput: {
    height: 48,
    fontSize: '1.6rem',
    borderRadius: '4px 4px 0 0',
    backgroundColor: '#fff',
    '&:not(:hover)': {
      backgroundColor: '#fff',
    },
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  listFilesContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    width: 300,
    maxHeight: '70vh',
    overflow: 'auto',
  },
  text: {
    cursor: 'pointer',
    minWidth: 254,
    fontSize: '14px',
    marginTop: 10,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  footerContainer: {
    marginLeft: 26,
    marginBottom: 20,
  },
  profileContainer: {
    marginBottom: theme.spacing(1),
  },
  profileTitle: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
}), { name: 'LeftPanel' });

export interface LeftPanelProps {
  searchLabel: string;
  items: Item[],
  onSortClick: () => void;
  onItemClick: (item: Item) => void;
}

const LeftPanel = ({ searchLabel = 'Recent files', items = [], onSortClick, onItemClick }: LeftPanelProps) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { push } = useHistory();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const currentUser: CurrentUser|null = useSelector(getCurrentUser);
  const authClientData = useSelector(getAuthClientData);

  useEffect(() => {
    if (!authClientData.clientId) {
      dispatch(fetchAuthClientData());
    }
  }, [dispatch, authClientData]);

  useEffect(() => {
    if (!isLoggedIn) {
      push({
        pathname: `/login`,
      });
    }
  }, [dispatch, currentUser, isLoggedIn]);

  useEffect(() => {

  }, [dispatch, currentUser, isLoggedIn]);

  const onLogoutSuccess = () => {
    localStorage.removeItem("currentUserToken");
    dispatch(logout());
  };

  return (
    <Grid
      container
      item
      className={classes.root}
      direction="column"
      justify="space-between"
    >
      <Grid
        container
        item
        className={classes.searchContainer}
        justify="center"
      >
        <FormControl classes={{ root: classes.input }} variant="filled">
          <InputLabel classes={{ root: classes.searchLabel }}>
            {searchLabel}
          </InputLabel>
          <FilledInput
            disableUnderline
            disabled
            classes={{ root: classes.filledInput }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={onSortClick}
                >
                  <SortIcon className={classes.sortIcon} />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Grid container item className={classes.listFilesContainer}>
          {items.map((item: Item) => (
            <Typography className={classes.text} key={item.id} variant="body2" onClick={() => onItemClick(item)}>
              {item.id}
            </Typography>
          ),
          )}
        </Grid>
      </Grid>

      {isLoggedIn && (
        <Grid container item className={classes.footerContainer}>
          <Grid container item className={classes.profileContainer}>
            <Avatar src={currentUser?.profileImageUrl} />
            <Typography className={classes.profileTitle}>{currentUser?.name}</Typography>
          </Grid >
          <Grid container item className={classes.profileContainer}>
            { authClientData.clientId && (
              <GoogleLogout
                buttonText="Logout"
                clientId={authClientData.clientId}
                onLogoutSuccess={onLogoutSuccess}
              />
            ) }
          </Grid >
        </Grid>
      )}
    </Grid>
  );
};

export default LeftPanel;
