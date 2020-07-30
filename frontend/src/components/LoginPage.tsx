import { Grid } from "@material-ui/core";
import React, { Dispatch, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Item } from "../store/entities";
import LeftPanel from "./common/LeftPanel";
import WelcomePage from "./WelcomePage";

const LoginPage = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { push } = useHistory();

  useEffect(() => {}, [dispatch]);

  const onChangeSortFiles = (): void => {};

  return (
    <Grid container>
      <LeftPanel
        items={[]}
        searchLabel="Recent files"
        onItemClick={(item: Item) => {}}
        onSortClick={onChangeSortFiles}
      />
      <WelcomePage />
    </Grid>
  );
};

export default LoginPage;
