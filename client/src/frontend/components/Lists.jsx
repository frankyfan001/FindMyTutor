import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { BaseCard } from './Cards';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //     maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function CardList({ cards }) {
  const classes = useStyles();

  const items = cards.map((card) => (
    <div className="item-wrapper">
      <ListItem alignItems="flex-start">
        <BaseCard props={card} />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  ));
  return (
    <List className={classes.root}>
      {items}
    </List>
  );
}
