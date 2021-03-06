/* eslint-disable */
import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline, FormControl,
  FormControlLabel,
  Grid,
  makeStyles, Radio, RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import React, {useState} from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Link as RouterLink} from 'react-router-dom';
import {useHistory, useLocation} from 'react-router';
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function LoginPage({
                                    accountHook,
                                    rememberUsername, setRememberUsername,
                                    rememberPassword, setRememberPassword
                                  }) {
  const classes = useStyles();

  const query = useQuery();

  const alertHook = useAlert();
  const [type, setType] = React.useState(query.get("type"));
  const [username, setUsername] = useState(rememberUsername);
  const [password, setPassword] = useState(rememberPassword);
  const [checked, setChecked] = useState(true);

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const input = {
      type,
      username,
      password,
    };

    const promise = accountHook.login(input);
    promise
      .then((result) => {
        if (checked) {
          setRememberUsername(username);
          setRememberPassword(password);
        } else {
          setRememberUsername("");
          setRememberPassword("");
        }

        alertHook.switchToSuccess("Login is successful.");

        setTimeout(function () {
          history.push("/");
        }, 1000)
      })
      .catch((err) => {
        alertHook.switchToFailure(err.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <br/>
        <br/>
        <FormControl component="fieldset">
          <RadioGroup aria-label="type" name="type" value={type} onChange={e => setType(e.target.value)}>
            <FormControlLabel value="tutor" control={<Radio/>} label="Tutor"/>
            <FormControlLabel value="student" control={<Radio/>} label="Student"/>
          </RadioGroup>
        </FormControl>
        <form className={classes.form} onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={checked} onChange={() => {
              setChecked(!checked)
            }}/>}
            label="Remember me"
            style={{float: 'left'}}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/register">
                Don't have an account? Sign Up
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <br/>
      <AlertMessage alertHook={alertHook}/>
    </Container>
  );
};
