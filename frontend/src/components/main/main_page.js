import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../stylesheets/idea.png';
import '../../stylesheets/greeting.css';


class MainPage extends React.Component {

  render() {
    return (
      <div className='main-all'>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        <div className='main-header-1'>
          <img className="logo" src={Logo} alt="login-logo" />
          <div className="title" >Light Up</div>
        </div>
        <div className="main-header-2">
          <Link className='log-in' to={'/login'}>Log in</Link>
          <Link className="get-started" to={'/signup'}>Get Started</Link>
        </div>
        
      </div>
    );
  }
}

export default MainPage;