/* eslint-disable */
import React, {useState} from 'react';
import {
    Avatar,
    Button, ButtonGroup,
    Chip,
    Grid,
    makeStyles,
    Paper,
    Typography,
} from '@material-ui/core';
import useTutorPosts from "../hooks/useTutorPosts";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {SchoolOutlined} from "@material-ui/icons";
import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import PostList from "./PostList";
import {Link} from "react-router-dom";
import PostLayout from "./PostLayout";


const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        margin: 'auto',
    },
    avatarInfo: {
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
    button: {
        background: 'linear-gradient(45deg, #F36887AE 30%, #F18651B0 90%)',
        margin: 'auto 3% auto auto',
    },
    accountInfo: {
        width: '100%',
        minHeight: theme.spacing(60),
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
    },
    labelText: {
        width: '100%',
        background: '#f1af8d',
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
    const tutorPostsHook = useTutorPosts();
    const tutorPost = tutorPostsHook.tutorPosts;

    function handleNewAvatarButton() {
        // TODO
    }

    return (
        <>
            <br/>
            {account &&
            <Grid container spacing={1} className={classes.root}>
                <Grid item xs={12} md={12}>
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
                        {/*Avatar Info*/}

                        {/*Account Info*/}
                        <Grid item xs={12} md={8} className={classes.accountInfo}>
                            <Grid container spacing={3}>
                                {/*Account Detail Title*/}
                                <Grid item xs={12} md={12} className={classes.accountTitle}>
                                    <Grid container spacing={2} justify="space-evenly">

                                        <Grid item xs={12} md={12}>
                                            <Typography variant="h6">Account Information</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/*Details*/}
                                <Grid item xs={12} md={12} className={classes.details}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={12} md={12}>
                                            <Grid container spacing={2}>

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
                                {/*Account Info*/}


                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
                {/*Post List*/}
                <br/>
                {accountHook.isTutor() && tutorPost.map((post, idx) =>
                    <Link key={post._id} to={`viewPost/${post._id}`} style={{textDecoration: 'none'}}>
                        <Grid item xs={12} md={12}>
                            <PostLayout post={post} idx={idx}/>
                        </Grid>
                    </Link>
                )}
            </Grid>
            }
        </>
    );
}