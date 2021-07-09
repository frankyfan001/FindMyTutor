/* eslint-disable */
import React, {useState} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';

import './App.css';
import { LoginForm } from './components/Login';
import SignUp from './components/Signup';
import { Post, Post1 } from './components/ViewPost';
import TeamPage from './components/TeamPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import useAccount from './hooks/useAccount';
import PostForm from './components/PostForm';
import HomePage from "./components/HomePage";
import {makeStyles} from "@material-ui/core";

function App() {
  const accountHook = useAccount();
  const [rememberUsername, setRememberUsername] = useState("");
  const [rememberPassword, setRememberPassword] = useState("");

  return (
    <Router>
      <div className="App">
        <NavBar title="Find My Tutor" accountHook={accountHook} />

        <Switch>
          <Route exact path="/">
            <HomePage accountHook={accountHook} />
          </Route>
          <Route path="/viewPost/:id" >
            <Post1 accountHook={accountHook} />
          </Route>
          <Route path="/newPost">
            <PostForm accountHook={accountHook} />
          </Route>

          <Route path="/register/">
            <SignUp accountHook={accountHook} />
          </Route>
          <Route path="/login">
            <LoginForm accountHook={accountHook}
                       rememberUsername={rememberUsername} setRememberUsername={setRememberUsername}
                       rememberPassword={rememberPassword} setRememberPassword={setRememberPassword} />
          </Route>
          <Route path="/account">
            // TODO: AccountPage.
            AccountPage
          </Route>
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
