/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import './App.css';
import { IconBase, LoginButton, OutlinedButton, RegisterButton } from './components/Buttons';
import { FilledTextField, FormBase } from './components/Forms';
import { TutorBanner } from './components/Banner';
import { BaseCard } from './components/Cards';
import { SearchBar, SearchInput } from './components/Search';
import { CardsApp } from './components/CardsApp';
import { Grid } from '@material-ui/core';
import { LoginForm } from './components/Login';
import SignUp from './components/Signup';
import { Post } from './components/ViewPost';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import useAccount from './hooks/useAccount';
import PostForm from './components/PostForm';

function App() {
  const accountHook = useAccount();

  return (
    <Router>
      <div className="App">
        <NavBar title="Find My Tutor" accountHook={accountHook} />

        <Switch>
          <Route exact path="/">
            <TutorBanner />
            <Grid container alignItems="center" justify="center">
              <Grid item align="center">
                <CardsApp />
              </Grid>
            </Grid>
          </Route>
          <Route path="/login">
            <LoginForm accountHook={accountHook} />
          </Route>
          <Route path="/register/">
            <SignUp accountHook={accountHook} />
          </Route>
          <Route path="/newpost">
            {accountHook.isLogin? <PostForm accountHook={accountHook} /> : <Redirect to="/" />}
          </Route>
          <Route path="/viewPost/:id" >
            <Post accountHook={accountHook} />
          </Route>
          // TODO: AccountPage.
          <Route path="/account">AccountPage</Route>
          <Route path="/team">
            <TeamPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
        </Switch>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
