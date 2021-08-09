/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(0),
      width: '100%',
    },
  },
}));

export const SearchInput = ({ value, handleSearch }) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        value={value}
        onChange={(e) => handleSearch(e)}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export const useSearch = () => {
    const [value, setValue] = useState('');
    const handleSearchInputChange = (value) => {
          setValue(value);
    }

    return {value, handleSearchInputChange}
}
