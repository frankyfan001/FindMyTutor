/* eslint-disable */
import React, { useEffect, useState } from 'react';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {
  Avatar,
  Box,
  Button,
  CardMedia,
  Chip,
  Container,
  CssBaseline,
  Grid, IconButton,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import queryString from 'query-string';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {
  Bookmark, Email, Phone, SchoolOutlined, ThumbDown,
} from '@material-ui/icons';
import { mockPost } from './mocks/mockPost';
import FormDialog from './CommentForm';
import useComments from '../hooks/useComment';
import usePost from '../hooks/usePost';

const useRootStyle = makeStyles(() => ({
  root: {
    maxWidth: '80%',
  },
}));

const useRating = (updateFunc, updateObject) => {
  const [isCancel, setCancel] = useState(false);
  console.log('handling rating');
  const handleClick = (e) => {
    const name = e.currentTarget.id;
    console.log('handling click');
    console.log(updateObject[name]);
    const rate = isCancel ? updateObject[name] - 1 : updateObject[name] + 1;
    console.log(rate);
    const newObject = {
      ...updateObject,
      [name]: rate,
    };
    console.log(newObject);
    setCancel(!isCancel);
    updateFunc(newObject);
  };

  return { handleClick, isCancel };
};
const usePostStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  accountInfo: {
    width: '100%',
    height: theme.spacing(60),
    margin: 'auto',
  },
  avatar: {
    width: '100%',
    height: theme.spacing(40),
    margin: 'auto',
  },
  username: {
    textTransform: 'none',
    minWidth: '8vh',
    fontWeight: 'bold',
    height: theme.spacing(5),
  },
  date: {
    textTransform: 'none',
    minWidth: '8vh',
    height: theme.spacing(5),
  },
  postInfo: {
    width: '100%',
    minHeight: theme.spacing(60),
    margin: 'auto',
  },
  availableDays: {
    width: '100%',
    minHeight: theme.spacing(15),
    margin: 'auto',
  },
  available: {
    width: theme.spacing(7),
    height: theme.spacing(4),
    color: 'white',
    background: '#f1af8d',
  },
  unavailable: {
    width: theme.spacing(7),
    height: theme.spacing(4),
    color: 'black',
  },
  details: {
    width: '100%',
    minHeight: theme.spacing(15),
    margin: 'auto',
  },
  label: {
    width: '70%',
    background: '#a5c1e2',
  },
  paper: {
    width: '91%',
    margin: 'auto',
  },
  description: {
    width: '100%',
    minHeight: theme.spacing(18),
    padding: '3% 3% 3% 3%',
  },
}));

export default function ViewPostPage({ accountHook }) {
  const classes = usePostStyles();

  const { post } = usePost();

  const content = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  return (
    <>
      <br />
      {post &&
      <Grid container spacing={3} className={classes.root}>

        {/*Post*/}
        <Grid item xs={12} md={12}>
          <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center">

            {/*Account Info*/}
            <Grid item xs={12} md={4} className={classes.accountInfo}>
              <Grid container spacing={3} direction="column" justify="space-evenly" alignItems="center">

                {/*Avatar*/}
                <Grid item xs={12} md={12}>
                  <Avatar variant="square" className={classes.avatar} alt={post.account_ref.username[0].toUpperCase()} src={post.account_ref.avatar} />
                </Grid>

                {/*Username*/}
                <Grid item xs={12} md={12}>
                  <Typography variant="h6" className={classes.username}>
                    {post.account_ref.username}
                  </Typography>
                </Grid>

                {/*Date*/}
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" className={classes.date}>
                    {post.createdAt.substring(0,10)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/*Post Info*/}
            <Grid item xs={12} md={8} className={classes.postInfo}>
              <Grid container spacing={3}>

                {/*Available Days*/}
                <Grid item xs={12} md={12} className={classes.availableDays}>
                  <Grid container spacing={2} justify="space-evenly">

                    <Grid item xs={12} md={12}>
                      <Typography variant="h6">Available Days</Typography>
                    </Grid>

                    {post.availableDays.map((available, idx) => (
                      <Grid item key={available}>
                        <Chip label={content.days[idx]} className={available ? classes.available : classes.unavailable}/>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                {/*Details*/}
                <Grid item xs={12} md={12} className={classes.details}>
                  <Grid container spacing={2}>

                    <Grid item xs={12} md={4}>
                      <Grid container spacing={2}>

                        {/*School*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<SchoolOutlined />} label={post.school} className={classes.label} />
                        </Grid>

                        {/*Course*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<Bookmark />} label={post.course} className={classes.label} />
                        </Grid>

                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Grid container spacing={2}>

                        {/*Wage*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<AttachMoneyIcon />} label={post.wage} className={classes.label} />
                        </Grid>

                        {/*ThumbUp*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<ThumbUpIcon />} label={post.thumbUp} className={classes.label} />
                        </Grid>

                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Grid container spacing={2}>

                        {/*Phone*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<Phone />} label={post.phone} className={classes.label} />
                        </Grid>

                        {/*Email*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<Email />} label={post.email} className={classes.label} />
                        </Grid>

                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>

                {/*Descriptions*/}
                <Grid item xs={12} md={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="body1" align="left" className={classes.description}>
                      {post.description}
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>
            </Grid>
          </Grid>

        </Grid>

        {/*Comment List*/}
        <Grid item xs={12} md={12}>
          <CommentList comments={mockPost.comments} />
          {/* <CommentList comments={post.comments} /> */}
        </Grid>

      </Grid>
      }
    </>
  );
};

// export function ViewPostPage1({ accountHook }) {
//   const classes = useRootStyle();
//   // const [post, setSinglePost] = useState(mockPost);
//
//   const params = queryString.parse(useLocation().search);
//   const { id } = params;
//   // const { getSinglePost, updatePost } = usePosts();
//
//   const {
//     post, setPost, getPost, updatePost,
//   } = usePost();
//
//   const { updateComment } = useComments(post.comments);
//   // useEffect(() => {
//   //   setPost(getPost(id));
//   // }, []);
//
//   console.log(post);
//   const { handleClick: handlePostRatingClick } = useRating(updatePost, post);
//   const { handleCommentRatingClick } = useRating(updateComment, post.comments);
//   return (
//     <>
//       <CssBaseline />
//       <Paper variant="outlined" className={classes.root}>
//         <Container>
//           <Grid container spacing={5} alignContent="center">
//             <Grid item>
//               <Grid container spacing={5} alignContent="center" direction="row">
//                 <Grid item>
//                   <PostInfo profile={post.profile} content={mockPost.content} />
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item>
//               <RatingArea up={post.thumbsUp} down={post.thumbsDown} handleClick={handlePostRatingClick} />
//             </Grid>
//             <Grid item style={{ width: '100%' }}>
//               <CommentList comments={post.comments} isLogin={accountHook.isLogin()} handleClick={handleCommentRatingClick} />
//             </Grid>
//           </Grid>
//         </Container>
//       </Paper>
//     </>
//   );
// };

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
    <Grid item xs={12} ssm={6}>
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

const CommentList = ({ comments, isLogin, handleClick }) => {
  const classes = useStyles();
  const dialogHooks = useDialog();
  return (
    <Grid container alignItems="flex-end" direction="column" spacing={5}>
      <Grid item>
        {isLogin
          ? (
            <Button variant="contained" color="primary" onClick={dialogHooks.handleClickOpen}>
              Add new comment
            </Button>
          )
          : (
            <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>
              <Button variant="contained" color="primary">
                Add new comment
              </Button>
            </Link>
          )}

        <FormDialog dialogHooks={dialogHooks} />
      </Grid>
      <Grid item className={classes.root}>
        <Grid container alignItems="stretch">
          {comments.map((comment, idx) => (
            <Grid item key={idx.toString()} xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Comment comment={comment} handleClick={handleClick} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Comment = ({ comment, handleClick }) => (
  <Grid container wrap="nowrap" spacing={2} xs={12} alignContent="space-between">
    <Grid item xs={1}>
      <Avatar alt={comment.user.name} src={comment.user.img} />
    </Grid>
    <Grid item xs={12}>
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
    <Grid item align="right" justify="space-between" xs={3}>
      <RatingArea up={comment.thumbsUp} down={comment.thumbsDown} handleClick={handleClick} />
    </Grid>
  </Grid>
);

const useRatingStyles = ((theme) => ({
  hover: {
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
}));
const RatingArea = ({ up, down, handleClick }) => {
  const classes = useRatingStyles();
  return (
    <Grid container direction="row" spacing={3}>
      <Grid item className={classes.hover}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbUpIcon />}
          onClick={handleClick}
          id="thumbsUp"
        >
          {up}
        </Button>
      </Grid>
      <Grid item className={classes.hover}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<ThumbDown />}
          id="thumbsDown"
          onClick={handleClick}
        >
          {down}
        </Button>
      </Grid>

    </Grid>
  );
};
