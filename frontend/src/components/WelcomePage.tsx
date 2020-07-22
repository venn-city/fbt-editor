import { Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { fetchAuthClientData, getAuthClientData, getCurrentUser, getIsLoggedIn, loginUser, loginUserFailure } from '../store/duck/auth';
import { CurrentUser, LoginUserRequest } from '../store/entities';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    overflow: 'scroll',
    height: '100vh',
    minHeight: 200,
  },
  headerContainer: {
    marginTop: theme.spacing(9),
    paddingLeft: theme.spacing(8),
  },
  welcomeContainer: {
  },
}), { name: 'ProjectItemsList' });

const WelcomePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { params: { projectId } } = useRouteMatch();
  const { push } = useHistory();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const currentUser: CurrentUser|null = useSelector(getCurrentUser);
  const authClientData = useSelector(getAuthClientData);

  useEffect(() => {
    if (!authClientData.clientId)
      dispatch(fetchAuthClientData());
  }, [dispatch, authClientData]);

  useEffect(() => {
    if (isLoggedIn) {
      push({
        pathname: `/projects`,
      });
    }
  }, [dispatch, currentUser, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      localStorage.setItem("currentUserToken", currentUser.tokenId);
    } else {
      const token = localStorage.getItem("currentUserToken");
      if (token) {
        var request = {
          tokenId: token,
        } as LoginUserRequest;
        dispatch(loginUser(request));
      }
    }
  }, [dispatch, currentUser, isLoggedIn]);

  const responseSucessGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    const googleLoginResponse: GoogleLoginResponse = response as GoogleLoginResponse;
    if (googleLoginResponse) {
      var request = {
        tokenId: googleLoginResponse.tokenId,
        email: googleLoginResponse.profileObj.email,
      } as LoginUserRequest;
      dispatch(loginUser(request));
    }
  };

  const responseFailureGoogle = (error: any) => {
    dispatch(loginUserFailure(error));
  };

  return (
    <Grid
      container
      item
      md
      alignItems="center"
      className={classes.root}
      direction="row-reverse"
      justify="center"
    >
      <Grid item className={classes.welcomeContainer}>
        <Typography variant="h1">Welcome to the FBT-editor</Typography>
        { authClientData.clientId && (
          <GoogleLogin
            buttonText="Login"
            clientId={authClientData.clientId}
            cookiePolicy="single_host_origin"
            onFailure={responseFailureGoogle}
            onSuccess={responseSucessGoogle}
          />
        )}
      </Grid>
      <Grid item className={classes.welcomeContainer}>
        <img alt="profile" src="https://facebook.github.io/fbt/img/fbt.png" />
      </Grid>
    </Grid>
  );
};

export default WelcomePage;
