/* eslint-disable */
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import {FormControl, Radio, RadioGroup} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {Alert} from "@material-ui/lab";
import useAlert from "../hooks/useAlert";

// Thanks to material-ui example:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
  },
}));

export default function SignUp({accountHook}) {
  const alertHook = useAlert();
  const [type, setType] = React.useState("tutor");

  const history = useHistory();

  const classes = useStyles();

  const onSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const avatar = e.target.avatar.value;

    const input = {
      type,
      username,
      password,
      fname,
      lname,
      avatar
    };

    const p = accountHook.register(input);
    p.then((output) => {
      if (output.success) {
        alertHook.switchToSuccess("Registration is successful.");

        setTimeout(function () {
          history.push("/");
        }, 1000)
      } else {
        alertHook.switchToFailure(output.error);
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <br />
        <br />
        <FormControl component="fieldset">
          <RadioGroup aria-label="type" name="type" value={type} onChange={e => setType(e.target.value)}>
            <FormControlLabel value="tutor" control={<Radio />} label="Become A Tutor" />
            <FormControlLabel value="student" control={<Radio />} label="Become A Student" />
          </RadioGroup>
        </FormControl>
        <form className={classes.form} onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lname"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="avatar"
                label="Avatar"
                type="avatar"
                id="avatar"
                autoComplete="avatar"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox required value="allowExtraEmails" color="primary" />}
                label="I agree to the terms of use and privacy policy."
                style={{ float: 'left' }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/login">
                Already have an account? Sign in
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <br />
      {
        alertHook.isSuccess() ?
          <Alert severity="success" onClose={() => {alertHook.switchToIdle("")}}>{alertHook.message}</Alert>
          : alertHook.isFailure() ?
          <Alert severity="warning" onClose={() => {alertHook.switchToIdle("")}}>{alertHook.message}</Alert>
          :
          <></>
      }
    </Container>
  );
}
