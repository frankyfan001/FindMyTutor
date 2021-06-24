/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import './App.css';
import {
  IconBase, LoginButton, OutlinedButton, RegisterButton,
} from './components/Buttons';
import { FilledTextField, FormBase } from './components/Forms';
import { TutorBanner } from './components/Banner';
import { BaseCard } from './components/Cards';
import { SearchBar, SearchInput } from './components/Search';
import { CardsApp } from './components/CardsApp';
import { Grid } from '@material-ui/core';
import { LoginForm } from './components/Login';
import SignUp from './components/Signup';
import { Post } from './components/ViewPost';

function App() {
  return (
    <Router>
      <div className="App">
        <Header title="Find My Tutor" />

        <Switch>
          // TODO: this sprint - main page.
          <Route exact path="/">
           <TutorBanner />
           <Grid container alignItems="center" justify="center">
             <Grid item align="center">
              {/* <CardsApp /> */}
              <Post />
             </Grid>
           </Grid>
           {/* <CardsApp /> */}
          </Route>

          // TODO: next sprint - other pages.
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/register">
            <SignUp />
          </Route>
          <Route path="/account">
            AccountPage
          </Route>
          <Route path="/about">
            AboutPage
          </Route>
          <Route path="/contact">
            ContactPage
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
