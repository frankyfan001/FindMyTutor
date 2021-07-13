/* eslint-disable */
import React, { useState } from 'react';
import {
  Avatar,
  Button, ButtonGroup,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import {useHistory, useParams} from 'react-router';
import { Link } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {
  Bookmark, SchoolOutlined, ThumbDown,
} from '@material-ui/icons';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import useComments from '../hooks/useComments';
import usePost from '../hooks/usePost';
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";

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
  alertMessageDiv: {
    maxWidth: '390px',
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
  thumbUp: {
    color: '#adc837',
  },
  thumbDown: {
    color: '#dd2d6b',
  },
  unselected: {
    color: 'lightgrey',
    background: 'white',
  },
  thumbUpSelected: {
    color: '#adc837',
    background: 'white',
    '&:hover': {
      color: '#adc837',
      background: 'white',
    },
  },
  thumbDownSelected: {
    color: '#dd2d6b',
    background: 'white',
    '&:hover': {
      color: '#dd2d6b',
      background: 'white',
    },
  },
}));

export default function ViewPostPage({ accountHook }) {
  const classes = useStyles();

  const alertHook = useAlert();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const postHook = usePost();
  const commentsHook = useComments();

  const post = postHook.post;
  const comments = commentsHook.comments;

  const history = useHistory();

  const content = {
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  };

  const handleNewCommentButton = () => {
    if (accountHook.isLogin() && accountHook.isStudent()) {
      setIsDialogOpen(true);
    } else {
      alertHook.switchToFailure("Please sign in as a student to add comments.");
      setTimeout(function () {
        history.push("/login?type=student");
      }, 5000)
    }
  };

  return (
    <>
      <br />
      {post &&
      <Grid container spacing={1} className={classes.root}>

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
                          <Chip color='secondary' icon={<ImportContactsIcon />} label={post.course} className={classes.label} />
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
          <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />}
                  onClick={handleNewCommentButton}>
            NEW COMMENT
          </Button>
        </Grid>

        {/*Show the alert message when user is not a login student.*/}
        <Grid item xs={12} md={12} align="right">
          <div className={classes.alertMessageDiv}>
            <AlertMessage alertHook={alertHook} />
          </div>
        </Grid>

        {/*Comments*/}
        <Grid item xs={12} md={12}>
          <CommentList comments={comments} accountHook={accountHook}/>
        </Grid>

      </Grid>
      }

      {/*New Comment Dialog*/}
      <NewCommentDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        accountHook={accountHook}
        postHook={postHook}
        commentsHook={commentsHook}
      />
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
          <ThumbUpIcon className={classes.thumbUp} /> :
          <ThumbDown className={classes.thumbDown} />}
      </Grid>
    </Grid>
  );
};

const NewCommentDialog = ({ isDialogOpen, setIsDialogOpen, accountHook, postHook, commentsHook }) => {
  const classes = useStyles();
  const { postId } = useParams();

  const alertHook = useAlert();

  const [isThumbUp, setIsThumbUp] = useState(true);
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    const newComment = {
      isThumbUp,
      description,
      account_ref: accountHook.account._id,
      post_ref: postId
    };
    // Add the comment.
    const promise = commentsHook.addComment(newComment);
    promise
      // Update the post with thumbUp/thumbDown + 1.
      .then((result) => {
        const updatedInfo = isThumbUp ?
          {thumbUp: postHook.post.thumbUp + 1} :
          {thumbDown: postHook.post.thumbDown + 1};
        return postHook.updatePost(postId, updatedInfo);
      })
      // Get the comments.
      .then((result) => {
        return commentsHook.getComments(postId);
      })
      // Get the post.
      .then((result) => {
        return postHook.getPost(postId);
      })
      // Clean up.
      .then((result) => {
        alertHook.switchToSuccess("Comment added successfully.");
        setTimeout(function () {
          setIsDialogOpen(false);
          alertHook.switchToIdle(null);
          setIsThumbUp(true);
          setDescription("");
        }, 1000)
      })
      // Error handling.
      .catch((err) => {
        alertHook.switchToFailure(err.message);
      });
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    if (!alertHook.isIdle()) {
      alertHook.switchToIdle(null);
      setIsThumbUp(true);
      setDescription("");
    }
  }

  return (
    <Dialog open={isDialogOpen} onClose={handleCancel}>
      <DialogTitle id="form-dialog-title">New Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>Good Experience?</DialogContentText>
        <ButtonGroup>
          <Button variant={isThumbUp ? "contained" : "outlined"}
                  className={isThumbUp ? classes.thumbUpSelected : classes.unselected}
                  onClick={() => {setIsThumbUp(true)}}>
            <ThumbUpIcon />
          </Button>
          <Button variant={isThumbUp ? "outlined" : "contained"}
                  className={isThumbUp ? classes.unselected : classes.thumbDownSelected}
                  onClick={() => {setIsThumbUp(false)}}>
            <ThumbDown />
          </Button>
        </ButtonGroup>
        <TextField
          margin="dense"
          id="comment-id"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={5}
          value={description}
          onChange={e => setDescription(e.target.value)}
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length)}
        />

        {/*Show the alert message when adding a comment failed.*/}
        <AlertMessage alertHook={alertHook} />

      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button color="primary" onClick={handleSubmit} >
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
