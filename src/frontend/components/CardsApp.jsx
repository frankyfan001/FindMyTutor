import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { Fragment } from 'react';
import { mockPosts } from './mockPosts';

// import { BaseCard as CardDemo } from './Cards';
import FilterTreeView from './FilterTree';
import { CardDemo } from './CardLayout';
import { SearchInput } from './Search';

const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: '80%',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    minHeight: '100vh',
    maxHeight: '100%',
    minWidth: '100%',
  },
}));

export const CardsApp = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <Paper varient="outlined" style={{ minWidth: '200px' }}>
            <FilterTreeView />
          </Paper>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" className={classes.root}>
            <Grid item>
              <SearchInput />
            </Grid>
            {mockPosts.map((post, idx) => (
              <Grid item key={idx.toString()}>
                <CardDemo cardHooks={post} idx={idx} />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* <Grid container direction="column" alignItems="stretch"
        justify="flex-start" className={classes.root}>
        <Grid item>
          <SearchInput />
        </Grid>
        {mockPosts.map((post, idx) => (
          <Grid item key={idx.toString()}>
            <CardDemo cardHooks={post} idx={idx} />
          </Grid>
        ))} */}
        {/* <Grid item>
          <CardDemo user={{ name: 'Franky Fan' }} idx={0} />
        </Grid>
        <Grid item>
          <CardDemo user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <CardDemo user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <CardDemo user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <CardDemo user={{ name: 'Franky Fan' }} />
        </Grid>
      </Grid> */}
      </Grid>
    </>

  );
};
