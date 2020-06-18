import {
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import React from 'react';
import { Item } from '../../store/entities';

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
}), { name: 'LeftPanel' });

export interface LeftPanelProps {
  searchLabel: string;
  items: Item[],
  onSortClick: () => void;
  onItemClick: (item: Item) => void;
}

const LeftPanel = ({ searchLabel = 'Recent files', items = [], onSortClick, onItemClick }: LeftPanelProps) => {
  const classes = useStyles();
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
    </Grid>
  );
};

export default LeftPanel;
