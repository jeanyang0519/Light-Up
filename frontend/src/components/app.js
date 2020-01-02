import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import IndexContainer from './index/index_container';
import ProfileContainer from './index_show_item/profile_container';
import Chat from './chat/chat';

const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

const App = () => (
  <div>

    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/login" component={LoginFormContainer} /> 
      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/dashboard" component={IndexContainer} />
      <Route exact path="/profile/:id" component={ProfileContainer} />
      <Route path="/chat" component={Chat}/>
    </Switch>
  </div>
);

export default App;