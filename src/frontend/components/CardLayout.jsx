/* eslint-disable */
import {
  Grid, IconButton, Typography, Avatar, makeStyles,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
// import { AccountCircle } from '@material-ui/icons';
import React from 'react';
import { SchoolChip, CourseChip } from './Cards';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

const useCardStyles = makeStyles(() => ({
  root: {
    width: '98.3%',
    background: '#f6ddd1',
  },
  root1: {
    width: '98.3%',
    background: '#fcf4ee',
  },
  avatar: {
    background: null,
  },
  nameButton: {
    textTransform: 'none',
  },
  dateButton: {
    textTransform: 'none',
  },
  schoolButton: {
    textTransform: 'none',
    minWidth: '8vh',
    color: 'white',
    background: '#f1af8d',
    boxShadow: 'none',
  },
  courseButton: {
    textTransform: 'none',
    minWidth: '8vh',
    color: 'white',
    background: '#a5c1e2',
    boxShadow: 'none',
  },
  descriptionButton: {
    textTransform: 'none',
  },
  wageButton: {
    textTransform: 'none',
  },
  LikesButton: {
    textTransform: 'none',
  },
  // light: {
  //   maxHeight: '160px',
  //   background: 'linear-gradient(45deg, #f3e5f5 50%, #8e24aa 30%)',
  // },
  // media: {
  //   // height: '0',
  //   paddingTop: '56.25%', // 16:9
  //   float: 'left',
  //   position: 'relative',
  //   maxWidth: '100px',
  //   maxHeight: '100px',
  // },
  // left: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  // },
}));

export default function CardLayout({ post, idx }) {
  const classes = useCardStyles();
  // style={{ background: 'palegreen' }}
  // const firstLetter = cardHooks.name[0];
  return (
    <>
      <div>
        <Grid container spacing={2} className={idx % 2 === 0 ? classes.root : classes.root1}>

          {/*Avatar*/}
          <Grid item xs={12} md={1}>
            <IconButton>
              <Avatar aria-label="avatar" className={classes.avatar}>
                S
              </Avatar>
            </IconButton>
          </Grid>

          {/*Name & Date*/}
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button size="small" className={classes.nameButton}>{ post.tutor }</Button>
                {/* <Typography>{cardHooks.name}</Typography> */}
                {/*<Typography>{ post.tutor }</Typography>*/}
                {/* UserName */}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button size="small" className={classes.dateButton}>16/06/2022</Button>
                {/* <Typography>{cardHooks.date}</Typography> */}
                {/*<Typography>16/06/2022</Typography>*/}
                {/* PostDate */}
              </Grid>
            </Grid>
          </Grid>

          {/*School & Course*/}
          <Grid item xs={12} md={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button variant="contained" size="small" className={classes.schoolButton}>{post.school}</Button>
                {/* <Button variant="outlined" size="small" className="try">UBC</Button> */}
                {/* <SchoolChip school={cardHooks.school} /> */}
                {/*<SchoolChip school={post.school} />*/}
                {/* School */}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button variant="contained" size="small" className={classes.courseButton}>{post.course}</Button>
                {/* <Button variant="outlined" size="small" className="try">CPSC 455</Button> */}
                {/* <CourseChip course={cardHooks.course} /> */}
                {/*<CourseChip course={post.course} />*/}
                {/* Course */}
              </Grid>
            </Grid>
          </Grid>

          {/*Description*/}
          <Grid item xs={12} md={6}>
            <Typography>
              <Button size="small" className={classes.descriptionButton}>{post.description}</Button>
              {/* Brief Description: this should be limited to the first 100 characters... */}
              {/* {cardHooks.description} */}
              {/* BriefDescription */}
            </Typography>
          </Grid>

          {/*Wage & Likes*/}
          <Grid item xs={12} md={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Button size="small">{post.price}</Button>
                {/*<Typography>{post.price}</Typography>*/}
                {' '}
                {/* WagePerHour */}
              </Grid>
              <Grid item xs={12} md={12}>
                <Button size="small" startIcon={<ThumbUpIcon />}>33</Button>
                 {/*<Typography>5</Typography>*/}
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
