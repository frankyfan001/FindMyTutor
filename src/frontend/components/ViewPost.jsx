import React from 'react';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import { mockPost } from './mocks/mockPost';

export const Post = () => (
  <>
    <CssBaseline />
    <Paper variant="outlined">
      <Container>
        <Grid container spacing={5} alignContent="center">
          <Grid item>
            <Grid container spacing={5} alignContent="center" direction="row">
              <Grid item>
                <Profile profile={mockPost.profile} />
              </Grid>
              <Grid item>
                <PostInfo title={mockPost.title} content={mockPost.content} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <CommentList comments={mockPost.comments} />
          </Grid>
        </Grid>
      </Container>
    </Paper>
  </>
);

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.29%',
  },
}));

const Profile = ({ profile }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="center">
      <Grid item>
        <CardMedia className={classes.media} image={profile.img} title="profile img" />
      </Grid>
      <Grid item>
        <Typography variat="body2" color="textSecondary" component="p">
          {profile.name}
        </Typography>
      </Grid>
    </Grid>
  );
};

const PostInfo = ({ title, content }) => (
  <Paper variant="outlined">
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item md={9}>
        <Box pt={3} pr={3} pl={3} pb={2}>
          <Typography variant="h5">{title}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box pt={2}>{content}</Box>
      </Grid>
    </Grid>
  </Paper>
);

const CommentList = ({ comments }) => (
  <Grid container alignItems="flex-end" direction="row">
    <Grid item>
      <Button variant="contained" color="primary">
        Add new comment
      </Button>
    </Grid>
    <Grid item>
      <Grid container>
        {comments.map((comment, idx) => (
          <Grid item key={idx.toString()}>
            <Comment comment={comment} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

const Comment = ({ comment }) => (
  <Grid container wrap="nowrap" spacing={2}>
    <Grid item>
      <Avatar alt={comment.user.name} src={comment.user.img} />
    </Grid>
    <Grid item>
      <h4 style={{ margin: 0, textAlign: 'left' }}>
        {comment.user.name}
      </h4>
      <Typography style={{ textAlign: 'left' }}>
        {comment.content}
      </Typography>
      <p style={{ textAlign: 'left', color: 'grey' }}>
        posted at
        {' '}
        {new Date().toLocaleDateString()}
      </p>
    </Grid>
  </Grid>
);
