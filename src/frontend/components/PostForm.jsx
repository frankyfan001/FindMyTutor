import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {
  Avatar,
  Button, CssBaseline, FormGroup, Icon, Paper, Typography,
} from '@material-ui/core';
import TitleIcon from '@material-ui/icons/Title';
import WrapTextIcon from '@material-ui/icons/WrapText';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { Link } from 'react-router-dom';
import { useFormStyle } from './LoginPage';
import usePosts from '../hooks/usePosts';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function PostForm({ id }) {
  const classes = useFormStyle();
  const { addPost } = usePosts();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: 9999,
      title: e.target.title.value,
      content: e.target.content.value,
      school: e.target.school.value,
      course: e.target.course.value,
    };
    console.log(newPost);
    addPost(newPost);
  };
  return (
    <Paper variant="outlined">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <FormGroup>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column" alignItems="stretch">
              <Grid item>
                <FormInput label="Title" icon={<TitleIcon />} />
              </Grid>
              <Grid item>
                <FormInput label="Content" multiLine icon={<WrapTextIcon />} />
              </Grid>
              <Grid item>
                <Grid container>
                  <Grid item>
                    <FormInput label="School" icon={<LibraryBooksIcon />} />
                  </Grid>
                  <Grid item>
                    <FormInput label="Course" icon={<LibraryBooksIcon />} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <Button color="primary" variant="contained" type="submit">Post</Button>
              </Link>
            </Grid>
          </form>

        </FormGroup>
      </div>

    </Paper>

  );
}

const FormInput = ({ label, multiLine, icon }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);
  return (
    <Paper variant="outlined">
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="stretch">
          <Grid item>
            {icon}
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" onChange={handleChange} label={label} multiline={multiLine} defaultValue={label} value={value} fullWidth name={label.trim().toLowerCase()} />
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
};
