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

export const SearchInput = ({ handleSearch }) => {
  const classes = useStyles();

  const [value, setValue] = useState('');

  console.log(value);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        value={value}
        onChange={(e) => {
          e.preventDefault();
          setValue(e.target.value);
          handleSearch(e.target.value);
        }}
        // onChange={handleSearch}
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
