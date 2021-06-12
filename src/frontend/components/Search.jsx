import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
    },
  },
}));

export const SearchInput = () => {
  const classes = useStyles();

  const [value, setValue] = useState('');

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        id="search-input"
        label="Search"
        variant="outlined"
        value={value}
        onChange={(newValue) => setValue(newValue)}
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
