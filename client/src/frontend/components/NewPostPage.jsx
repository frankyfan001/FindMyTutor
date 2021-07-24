/* eslint-disable */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {
  Avatar,
  Button, ButtonGroup, FormGroup, Paper, Typography,
} from '@material-ui/core';
import {SchoolOutlined} from "@material-ui/icons";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import DescriptionIcon from '@material-ui/icons/Description';
import PostAddIcon from '@material-ui/icons/PostAdd';
import {useHistory} from "react-router";
import useAlert from "../hooks/useAlert";
import AlertMessage from "./AlertMessage";

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  dayButtonGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  unselectedDayButton: {
    color: 'black',
    background: 'white',
    '&:hover': {
      color: 'black',
      background: 'white',
    },
    textTransform: 'none',
  },
  selectedDayButton: {
    color: 'white',
    background: '#f1af8d',
    '&:hover': {
      color: 'white',
      background: '#f1af8d',
    },
    textTransform: 'none',
  },
  submitButton: {
    color: 'white',
    background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
  },
}));

export default function NewPostPage({ accountHook, postsHook }) {
  const classes = useStyles();

  const alertHook = useAlert();

  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);

  const [school, setSchool] = useState("");
  const [course, setCourse] = useState("");
  const [wageInStr, setWageInStr] = useState("");
  const [contact, setContact] = useState("");
  const [description, setDescription] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const availableDays = [mon, tue, wed, thu, fri, sat, sun];
    const wage = parseInt(wageInStr, 10);
    const thumbUp = 0;
    const thumbDown = 0;
    const account_ref = accountHook.account? accountHook.account._id : null;

    const newPost = {
      availableDays,
      school,
      course,
      wage,
      contact,
      thumbUp,
      thumbDown,
      description,
      account_ref
    }

    const Promise = postsHook.addPost(newPost);
    Promise
      .then((result) => {
        alertHook.switchToSuccess("Post added successfully.");
        setTimeout(function () {
          history.push("/viewPost/" + result._id);
        }, 1000)
      })
      .catch((err) => {
        alertHook.switchToFailure(err.message);
      });
  };

  return (
    <Paper variant="outlined">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Post
        </Typography>
        <br />
        <br />
        <FormGroup>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column" alignItems="stretch">

              {/*Available Days*/}
              <Grid item xs={12} md={12}>
                <Typography>Available Days</Typography>
                <div className={classes.dayButtonGroup}>
                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button size="small" className={mon ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setMon(!mon)}>Mon</Button>
                    <Button size="small" className={tue ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setTue(!tue)}>Tue</Button>
                    <Button size="small" className={wed ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setWed(!wed)}>Wed</Button>
                    <Button size="small" className={thu ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setThu(!thu)}>Thu</Button>
                    <Button size="small" className={fri ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setFri(!fri)}>Fri</Button>
                    <Button size="small" className={sat ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setSat(!sat)}>Sat</Button>
                    <Button size="small" className={sun ? classes.selectedDayButton : classes.unselectedDayButton} onClick={() => setSun(!sun)}>Sun</Button>
                  </ButtonGroup>
                </div>
              </Grid>

              {/*School & Course*/}
              <Grid item xs={12} md={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormInput label="School" icon={<SchoolOutlined />} value={school} setValue={setSchool} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput label="Course" icon={<ImportContactsIcon value={course} />} setValue={setCourse} />
                  </Grid>
                </Grid>
              </Grid>

              {/*Wage & Contact*/}
              <Grid item xs={12} md={12}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <FormInput label="Wage ($ / h)" icon={<MonetizationOnIcon value={wageInStr} />} setValue={setWageInStr} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormInput label="Contact" icon={<ContactPhoneIcon value={contact} />} setValue={setContact} />
                  </Grid>
                </Grid>
              </Grid>

              {/*Description*/}
              <Grid item xs={12} md={12}>
                <FormInput label="Description" icon={<DescriptionIcon />} isDescription={true} value={description} setValue={setDescription} />
              </Grid>

              {/*Show the alert message when adding a post failed.*/}
              <Grid item xs={12} md={12}>
                <AlertMessage alertHook={alertHook} />
              </Grid>

              {/*Submit Button*/}
              <Grid item xs={12} md={12}>
                <Button variant="contained" type="submit" className={classes.submitButton}>Submit</Button>
              </Grid>
              <br />
            </Grid>
          </form>
        </FormGroup>
      </div>
    </Paper>
  );
}

const FormInput = ({ label, icon, isDescription, value, setValue }) => {
  const classes = useStyles();

  return (
    <Paper variant="outlined">
      <div className={classes.margin}>
        <Grid container spacing={1} direction="row" alignItems="stretch">

            {isDescription ?
              <>
                <Grid item xs={12} md={12}>
                  <TextField
                    multiline
                    rows={5}
                    required
                    fullWidth
                    label={label}
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                  />
                </Grid>
              </>
              :
              <>
                <Grid item xs={12} md={2}>
                  {icon}
                </Grid>
                <Grid item xs={12} md={10}>
                  <TextField
                    required
                    fullWidth
                    label={label}
                    value={value}
                    onChange={(e) => {setValue(e.target.value)}}
                  />
                </Grid>
              </>
            }
        </Grid>
      </div>
    </Paper>
  );
};
