import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import IndexContainer from './index/index_container';
import ProfileContainer from './index_show_item/profile_container';
import Chat from './chat/chat';
import NavBar from '../components/nav/navbar_container';


const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={LoginFormContainer} /> 
      <Route exact path="/signup" component={SignupFormContainer} />
      <Route exact path="/" component={MainPage} />
      <Route path='/' component={NavBar} />
    </Switch>
      <Route exact path="/dashboard" component={IndexContainer} />
      <Route exact path="/profile/:id" component={ProfileContainer} />
      <Route path="/chat" component={Chat}/>
  </div>
);

export default App;