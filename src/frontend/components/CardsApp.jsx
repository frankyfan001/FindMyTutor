import { Grid, makeStyles } from '@material-ui/core';
import React, { Fragment } from 'react';

import { BaseCard } from './Cards';
import { SearchInput } from './Search';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '70%',
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    minHeight: '100vh',
    maxHeight: '100%',
  },
}));

export const CardsApp = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container direction="column" alignItems="stretch" justify="flex-start" className={classes.root}>
        <Grid item>
          <SearchInput />
        </Grid>
        {Array(4).fill({ name: 'Franky Fan' }).map((user, idx) => (
          <Grid item>
            <BaseCard user={user} idx={idx} key={idx.toString()} />
          </Grid>
        ))}
        {/* <Grid item>
          <BaseCard user={{ name: 'Franky Fan' }} idx={0} />
        </Grid>
        <Grid item>
          <BaseCard user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <BaseCard user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <BaseCard user={{ name: 'Franky Fan' }} />
        </Grid>
        <Grid item>
          <BaseCard user={{ name: 'Franky Fan' }} />
        </Grid>
      </Grid> */}
      </Grid>
    </>

  );
};
