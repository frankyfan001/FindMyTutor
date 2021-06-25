import React, { useEffect } from 'react';
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
import FormDialog from './CommentForm';

const useRootStyle = makeStyles(() => ({
  root: {
    maxWidth: '80%',
  },
}));

export const Post = () => {
  const classes = useRootStyle();
  return (
    <>
      <CssBaseline />
      <Paper variant="outlined" className={classes.root}>
        <Container>
          <Grid container spacing={5} alignContent="center">
            <Grid item>
              <Grid container spacing={5} alignContent="center" direction="row">
                <Grid item>
                  <PostInfo profile={mockPost.profile} content={mockPost.content} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{ width: '100%' }}>
              <CommentList comments={mockPost.comments} />
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(() => ({
  media: {
    paddingTop: '56.29%',
  },
  root: {
    height: '100%',
    width: '100%',
  },
}));

const Profile = ({ profile }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="space-around" className={classes.root}>
      <Paper variant="outlined" style={{ width: '100%' }}>
        <Grid item xs={6} className={classes.root}>
          <CardMedia className={classes.media} image={profile.img} title="profile img" />
        </Grid>
        <Grid item xs={6}>
          <Typography variat="body2" color="textSecondary" component="p">
            {profile.name}
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

const PostContent = ({ content }) => (
  <Paper variant="outlined">
    <Grid container spacing={2} alignItems="flex-start">
      <Grid item md={9}>
        <Box pt={3} pr={3} pl={3} pb={2}>
          <Typography variant="h6">{content.title}</Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box pt={2}>{content.text}</Box>
      </Grid>
    </Grid>
  </Paper>
);

const PostInfo = ({ profile, content }) => (
  <Grid container alignItems="stretch" direction="row">
    <Grid item xs={12} sm={6}>
      <Profile profile={profile} />
    </Grid>
    <Grid item xs={12} sm={6}>
      <PostContent content={content} />
    </Grid>
  </Grid>
);

const useDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [width, setWidth] = React.useState((window.innerHeight * 0.8));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleResize = () => setWidth((window.innerHeight * 0.8));

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    open, handleClickOpen, handleClose, width,
  };
};

const CommentList = ({ comments }) => {
  const classes = useStyles();
  const dialogHooks = useDialog();
  return (
    <Grid container alignItems="flex-end" direction="column" spacing={5}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={dialogHooks.handleClickOpen}>
          Add new comment
        </Button>
        <FormDialog dialogHooks={dialogHooks} />
      </Grid>
      <Grid item className={classes.root}>
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
};

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
