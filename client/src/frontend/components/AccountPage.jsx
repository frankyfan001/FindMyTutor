/* eslint-disable */
import React, {useState} from 'react';
import {
  Avatar,
  Button,
  Chip,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import useTutorPosts from "../hooks/useTutorPosts";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {SchoolOutlined} from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import DeleteIcon from '@material-ui/icons/Delete';
import {Link} from "react-router-dom";
import PostLayout from "./PostLayout";
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import usePages from "../hooks/usePages";
import {Pagination} from '@material-ui/lab';
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    margin: 'auto',
  },
  avatarInfo: {
    width: '100%',
    height: theme.spacing(45),
    margin: 'auto',
  },
  avatar: {
    width: '100%',
    height: theme.spacing(30),
    margin: 'auto',
    borderRadius: '0.5rem',
  },
  username: {
    textTransform: 'none',
    minWidth: '8vh',
    fontWeight: 'bold',
    height: theme.spacing(5),
  },
  button: {
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
    margin: 'auto 3% auto auto',
  },
  deleteButton: {
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
    verticalAlign: "middle",
    margin: 'auto 3% auto auto',
  },
  accountInfo: {
    width: '100%',
    minHeight: theme.spacing(45),
    margin: 'auto',
  },
  details: {
    width: '100%',
    minHeight: theme.spacing(15),
    margin: 'auto',
  },
  label: {
    width: '100%',
    background: '#a5c1e2',
    fontWeight: 'bold',
  },
  labelText: {
    width: '100%',
    background: '#f1af8d',
    fontWeight: 'bold',
  },
  accountTitle: {
    width: '100%',
    minHeight: theme.spacing(5),
    margin: 'auto',
  },
}));

export default function AccountPage({accountHook}) {
  const classes = useStyles();

  const account = accountHook.account;
  const studentFav = accountHook.favorites;
  const tutorPostsHook = useTutorPosts({accountHook});
  const tutorPosts = tutorPostsHook.tutorPosts;
  const alertHook = useAlert();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleNewAvatarButton() {
    setIsDialogOpen(true);
  }

  const handleDeleteClick = (postId) => {
    const promise = tutorPostsHook.deletePost(postId);
    promise.then(() => {
      tutorPostsHook.getTutorPosts(account._id).catch((err) => {
      });
      alertHook.switchToSuccess("Delete Post is successful");
    }).catch((err) => {
      alertHook.switchToFailure(err.message);
    }).finally(() => {
      setTimeout(function () {
        alertHook.switchToIdle(null);
      }, 1000)
    });
  }

  const {page, handleChange} = usePages();

  return (
    <>
      <br/>
      {account && (account.type === "tutor" || studentFav) &&
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={12} md={12}>

          {/*Account Info*/}
          <Grid container spacing={3} direction="row" justify="space-evenly" alignItems="center">

            {/*Avatar Info*/}
            <Grid item xs={12} md={4} className={classes.avatarInfo}>
              <Grid container spacing={3} direction="column" justify="space-evenly" alignItems="center">
                {/*Avatar*/}
                <Grid item xs={12} md={12}>
                  <Avatar variant="square" className={classes.avatar}
                          alt={account.username[0].toUpperCase()} src={account.avatar}/>
                </Grid>
                {/*New Avatar Button*/}
                <Grid item xs={12} md={12} align="right">
                  <Button variant="contained" color="primary" className={classes.button}
                          startIcon={<AddAPhotoIcon/>}
                          onClick={handleNewAvatarButton}>
                    CHANGE
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            {/*Account Info*/}
            <Grid item xs={12} md={8} className={classes.accountInfo}>
              <Grid container spacing={3}>
                {/*Account Detail Title*/}
                <Grid item xs={12} md={12} className={classes.accountTitle}>
                  <Grid container spacing={2} justify="space-evenly">

                    <Grid item xs={12} md={12}>
                      <Typography
                        variant="h4">{accountHook.isTutor() ? "Tutor Account" : "Student Account"}</Typography>
                    </Grid>
                  </Grid>
                </Grid>

                {/*Details*/}
                <Grid item xs={12} md={12} className={classes.details}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <Grid container spacing={3}>

                        {/*AccountType*/}
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary' icon={<SchoolOutlined/>}
                                label="Account Type" className={classes.label}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary'
                                label={account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase()}
                                className={classes.labelText}/>
                        </Grid>
                        {/*Username*/}
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary' icon={<PersonIcon/>}
                                label="Username" className={classes.label}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary'
                                label={account.username} className={classes.labelText}/>
                        </Grid>
                        {/*Name*/}
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary' icon={<FaceIcon/>}
                                label="Name" className={classes.label}/>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Chip color='secondary'
                                label={account.fname.charAt(0).toUpperCase()
                                + account.fname.slice(1).toLowerCase()
                                + " "
                                + account.lname.charAt(0).toUpperCase()
                                + account.lname.slice(1).toLowerCase()}
                                className={classes.labelText}/>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/*Posts Title*/}
          <br/>
          <br/>
          {accountHook.isTutor() &&
          <Grid container justify="flex-start" alignItems="flex-start">
            <Grid item>
              <Typography variant="h6">My Posts</Typography>
            </Grid>
          </Grid>
          }
          {accountHook.isStudent() &&
          <Grid container spacing={1} justify="flex-start" alignItems="flex-start">
            <Grid item>
              <FavoriteIcon color="secondary"/>
            </Grid>
            <Grid item>
              <Typography variant="h6">My Favorites</Typography>
            </Grid>
          </Grid>
          }

          <AlertMessage alertHook={alertHook}/>
          <br/>

          {/*Post List*/}
          {accountHook.isTutor() && tutorPosts.slice((page - 1) * 10, page * 10).map((post, idx) =>
            <Grid container spacing={0} direction="row" justify="space-evenly" alignItems="center" key={post._id}>
              <Grid item xs={12} md={11}>
                <Link to={`viewPost/${post._id}`} style={{textDecoration: 'none'}}>
                  <PostLayout post={post} idx={idx}/>
                </Link>
              </Grid>
              <Grid item xs={12} md={1}>
                <Button variant="contained" color="primary" className={classes.deleteButton}
                        startIcon={<DeleteIcon/>}
                        onClick={() => handleDeleteClick(post._id)}>
                  DELETE
                </Button>
                <br/>
                <br/>
                <br/>
              </Grid>
            </Grid>
          )}

          {accountHook.isStudent() && studentFav.slice((page - 1) * 10, page * 10).map((post, idx) =>
            <Grid container spacing={0} direction="row" justify="space-evenly" alignItems="center" key={post._id}>
              <Grid item xs={12} md={12}>
                <Link to={`viewPost/${post._id}`} style={{textDecoration: 'none'}}>
                  <PostLayout post={post} idx={idx}/>
                </Link>
              </Grid>
              <br/>
              <br/>
              <br/>
            </Grid>
          )}
          {accountHook.isLogin() ?
            <Pagination page={page}
                        count={accountHook.isStudent() ? Math.ceil((studentFav.length) / 10) : accountHook.isTutor() ? Math.ceil((tutorPosts.length) / 10) :
                          <br/>} showFirstButton showLastButton onChange={handleChange}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
            /> : <br/>}
        </Grid>
      </Grid>
      }

      {/*New Avatar Dialog*/}
      <NewAvatarDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        accountHook={accountHook}
      />
    </>
  );
};

const NewAvatarDialog = ({isDialogOpen, setIsDialogOpen, accountHook}) => {
  const [avatar, setAvatar] = useState("");
  const alertHook = useAlert();

  const handleSubmit = () => {
    const updateInfo = {avatar: avatar};

    // call twice to update account page avatar
    return accountHook.updateAccount(updateInfo).then(() => {
      accountHook.updateAccount(updateInfo).then((result) => {
        alertHook.switchToSuccess("Update Avatar is successful");
        setTimeout(function () {
          setIsDialogOpen(false);
          alertHook.switchToIdle(null);
          setAvatar("");
        }, 1000)
      }).catch((err) => {
        alertHook.switchToFailure(err.message);
      })
    });
  }

  const handleCancel = () => {
    setIsDialogOpen(false);
    if (!alertHook.isIdle()) {
      alertHook.switchToIdle(null);
      setAvatar("");
    }
  }

  return (
    <Dialog open={isDialogOpen} onClose={handleCancel} contentStyle={{
      width: '50%',
      maxWidth: 'none',
    }}>
      <DialogTitle id="form-dialog-title">New Avatar</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          id="comment-id"
          label="New Avatar Link"
          type="text"
          fullWidth
          multiline
          rows={5}
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          autoFocus
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length)}
        />

        {/*Show the alert message when adding a avatar failed.*/}
        <AlertMessage alertHook={alertHook}/>

      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleCancel}>
          CANCEL
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
