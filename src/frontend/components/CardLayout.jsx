import {
  Grid, IconButton, Typography, Avatar, makeStyles,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
// import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { SchoolChip, CourseChip } from './Cards';

const useCardStyles = makeStyles(() => ({
  root: {
    maxWidth: '100%',
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
    maxHeight: '160px',
  },
  root1: {
    maxWidth: '100%',
    background: 'linear-gradient(45deg, #EED4D9FF 30%, #EAD7CFFF 90%)',
    maxHeight: '160px',
  },
  root2: {
    maxWidth: '100%',
    background: '#eed4d9',
    maxHeight: '160px',
  },
  light: {
    maxHeight: '160px',
    background: 'linear-gradient(45deg, #f3e5f5 50%, #8e24aa 30%)',
  },
  media: {
    // height: '0',
    paddingTop: '56.25%', // 16:9
    float: 'left',
    position: 'relative',
    maxWidth: '100px',
    maxHeight: '100px',
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export function CardDemo({ post, idx }) {
  const classes = useCardStyles();
  // style={{ background: 'palegreen' }}
  // const firstLetter = cardHooks.name[0];
  return (
    <>
      <div>
        <Grid container spacing={2} className={idx % 2 === 0 ? classes.root : classes.root1}>
          <Grid item xs={12} md={1}>
            <IconButton>
              {/* <AccountCircle /> */}
              <Avatar aria-label="avatar" className={classes.avatar}>
                {/* {firstLetter} */}
                S
              </Avatar>
              {/* UserIcon */}
            </IconButton>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {/* <Typography>{cardHooks.name}</Typography> */}
                <Typography>{ post.tutor }</Typography>
                {/* UserName */}
              </Grid>
              <Grid item xs={12} md={12}>
                {/* <Typography>{cardHooks.date}</Typography> */}
                <Typography>16/06/2022</Typography>
                {/* PostDate */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                {/* <Button variant="outlined" size="small" className="try">UBC</Button> */}
                {/* <SchoolChip school={cardHooks.school} /> */}
                <SchoolChip school={post.school} />
                {/* School */}
              </Grid>
              <Grid item xs={12} md={12}>
                {/* <Button variant="outlined" size="small" className="try">CPSC 455</Button> */}
                {/* <CourseChip course={cardHooks.course} /> */}
                <CourseChip course={post.course} />
                {/* Course */}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>
              {/* Brief Description: this should be limited to the first 100 characters... */}
              {post.description}
              {/* {cardHooks.description} */}
              {/* BriefDescription */}
            </Typography>
          </Grid>
          <Grid item xs={12} md={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography>{post.price}</Typography>
                {' '}
                {/* WagePerHour */}
              </Grid>
              <Grid item xs={12} md={12}>
                {/* <Typography>5 v 1</Typography> */}
                {/* {' '} */}
                {/* Like vs Dislike */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <br />
    </>
  );
}

export default CardDemo;
