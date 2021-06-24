import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { mockPosts } from './mocks/mockCards';

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

const useCards = () => {
  const [cards, setCards] = useState(mockPosts);
  const [filter, setFilter] = useState('');
  // const [search, setSearch] = useState('');

  // Click filter tree item
  const handleClick = (e) => {
    e.preventDefault();
    const item = e.target.innerText.toLowerCase().trim();
    setFilter(item);
  };

  // filter posts based on filter tree selection
  const handleSearch = (newValue) => {
    const valueProcessed = newValue.trim().toLowerCase();
    setCards(mockPosts.filter((card) => {
      console.log(filter);
      if (filter) {
        return card[filter].trim().toLowerCase().includes(valueProcessed);
      }
      return Object.values(card).some((val) => val.trim().toLowerCase().includes(valueProcessed));
    }));
  };

  return {
    cards, setCards, filter, handleClick, handleSearch,
  };
};

export const CardsApp = () => {
  const classes = useStyles();
  const cardsHook = useCards();

  console.log(cardsHook.cards);

  return (
    <>
      <Grid container direction="row" spacing={3}>
        <Grid item>
          <Paper varient="outlined" style={{ minWidth: '200px' }}>
            <FilterTreeView onNodeSelect={cardsHook.handleClick} />
          </Paper>
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="stretch" justify="flex-start" className={classes.root}>
            <Grid item>
              <SearchInput handleSearch={cardsHook.handleSearch} />
            </Grid>
            {cardsHook.cards.map((post, idx) => (
              <Grid item key={idx.toString()}>
                <CardDemo post={post} idx={idx} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>

  );
};
