import { Grid, makeStyles, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React from 'react';
import { Project } from '../../store/entities';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
  dividerContainer: {
    marginTop: theme.spacing(1),
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  chevronRightIcon: {
    width: 24,
    height: 24,
    cursor: 'pointer',
  },
}), { name: 'ListItem' });

interface ListItemProps {
  name: string;
  description: string;
  onItemClick: () => void;
}

const ListItem = ({ name, description, onItemClick }: Project) => {
  const classes: any = useStyles();

  return (
    <Grid container item className={classes.root} justify="space-between">
      <Grid container item alignItems="center" md={2}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid container item alignItems="center" md={4}>
        <Typography variant="body2">{description}</Typography>
      </Grid>
      <Grid container item alignItems="center" md={2}>
        <ChevronRightIcon
          className={classes.chevronRightIcon}
          onClick={() => onItemClick(name)}
        />
      </Grid>
      <Grid container className={classes.dividerContainer}>
        <Divider className={classes.divider} />
      </Grid>
    </Grid>
  );
};

export default ListItem;
