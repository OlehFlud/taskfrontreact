import React from 'react';
import {
  BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import './App.css';
import HomePage from "./Container/HomePage/HomePage";
import SecondPage from "./Container/SecondPage/SecondPage";
import NotFoundPage from "./Container/NotFoundPage/NotFoundPage";
import LoginPage from "./Container/LoginPage/LoginPage";
import RegisterPage from "./Container/RegisterPage/RegisterPage";

function App() {
  return (

      <Router>
        <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/friends" component={SecondPage}/>
        <Route  path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage} />
        <Route
            path="/not-found"
            render={routeProps => (
                <NotFoundPage {...routeProps}/>
            )}
        />
        <Redirect
            from="*"
            to={{
              pathname: '/not-found'
            }}
        />

        </Switch>
        </Router>

  )
}

export default App;
