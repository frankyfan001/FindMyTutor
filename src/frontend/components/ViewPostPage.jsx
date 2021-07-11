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
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import FormDialog from './CommentForm';
import useComments from '../hooks/useComments';
import usePost from '../hooks/usePost';
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
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
    minHeight: theme.spacing(19),
    padding: '3% 3% 3% 3%',
  },
  button: {
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
    margin: 'auto 3% auto auto',
  },
  commentListRoot: {
    width: '92%',
    margin: 'auto',
  },
  commentAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

export default function ViewPostPage({ accountHook }) {
  const classes = useStyles();

  const { post } = usePost();
  const { comments } = useComments();

  const dialogHooks = useDialog();

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
                      <Grid item key={idx}>
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
                          <Chip color='secondary' icon={<MonetizationOnIcon />} label={"$" + post.wage + " / hour"} className={classes.label} />
                        </Grid>

                        {/*Contact*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<ContactPhoneIcon />} label={post.contact} className={classes.label} />
                        </Grid>

                      </Grid>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Grid container spacing={2}>

                        {/*ThumbUp*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<ThumbUpIcon />} label={post.thumbUp} className={classes.label} />
                        </Grid>

                        {/*ThumbDown*/}
                        <Grid item xs={12} md={12}>
                          <Chip color='secondary' icon={<ThumbDown />} label={post.thumbDown} className={classes.label} />
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

        {/*New Comment Button*/}
        <Grid item xs={12} md={12} align="right">
          {accountHook.isLogin() && accountHook.isStudent() ?

            <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />} onClick={dialogHooks.handleClickOpen}>
              NEW COMMENT
            </Button> :

            <Link to="/login?type=student" style={{ textDecoration: 'none', color: 'black' }}>
              <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />}>
                NEW COMMENT
              </Button>
            </Link> }

          <FormDialog dialogHooks={dialogHooks} />
        </Grid>

        {/*Comment List*/}
        <Grid item xs={12} md={12}>
          <CommentList comments={comments} accountHook={accountHook}/>
        </Grid>

      </Grid>
      }
    </>
  );
};

const CommentList = ({ comments }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={0} className={classes.commentListRoot}>
      <Grid item>
        <Grid container alignItems="stretch">
          {comments.map((comment, idx) => (
            <Grid item key={idx.toString()} xs={12} style={{ paddingLeft: 0, paddingRight: 0 }}>
              <br />
              <Comment comment={comment} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

const Comment = ({ comment }) => {
  const classes = useStyles();

  return (
    <Grid container wrap="nowrap" spacing={0} alignContent="space-between">
      <Grid item xs={2} align="center">
        <Avatar alt={comment.account_ref.username[0].toUpperCase()} src={comment.account_ref.avatar} className={classes.commentAvatar} />
      </Grid>
      <Grid item xs={8}>
        <h4 style={{ margin: 0, textAlign: 'left' }}>
          {comment.account_ref.username}
        </h4>
        <Typography style={{ textAlign: 'left' }}>
          {comment.description}
        </Typography>
        <br />
        <Typography variant="caption" display="block" gutterBottom style={{ textAlign: 'left', color: 'grey' }}>
          { 'posted at ' + comment.createdAt.substring(0,10) }
        </Typography>
      </Grid>
      <Grid item xs={2} align="right">
        { comment.isThumbUp ?
          <ThumbUpIcon /> :
          <ThumbDown />}
      </Grid>
    </Grid>
  );
};

// Backup Codes only.
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

const Profile = ({ profile }) => {
  const classes = useStyles();
  return (
    <Grid container alignItems="space-around" className={classes.root}>
      <Paper variant="outlined" style={{ width: '100%' }}>
        <Grid item xs={6} className={classes.root}>
          <CardMedia image={profile.img} title="profile img" />
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

const useRatingStyles = makeStyles((theme) => ({
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
