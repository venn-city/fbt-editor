import { Grid, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { clearFilteredFileContent, setFilteredFileContent } from '../../store/duck/fileContent';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#bbdef7',
  },
  searchField: {
    border: 'none',
  },
  input: {
    padding: 0,
  },
}), { name: 'SearchContent' });

const SearchContent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [openSearch, setOpenSearch] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm.length > 1) {
      dispatch(setFilteredFileContent(debouncedSearchTerm));
      return () => {
        dispatch(clearFilteredFileContent());
      };
    }
  }, [debouncedSearchTerm, dispatch]);

  return (
    <Grid
      container
      item
      md
      alignItems="center"
      className={classes.root}
      justify="flex-end"
    >
      {openSearch && (
        <Grid container item md>
          <TextField
            autoFocus
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              classes: {
                notchedOutline: classes.searchField,
                input: classes.input,
              },
            }}
            placeholder="Search"
            type="text"
            value={searchTerm}
            variant="outlined"
            onChange={({ target: { value } }: any) => setSearchTerm(value)}
          />
        </Grid>
      )}
      <Grid item>
        <IconButton onClick={() => {
          setSearchTerm('');
          setOpenSearch(!openSearch);
        }}
        >
          {openSearch
            ? <CloseIcon />
            : <SearchIcon />
          }
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SearchContent;
