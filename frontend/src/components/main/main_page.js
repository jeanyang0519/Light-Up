import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../stylesheets/idea.png';
import '../../stylesheets/greeting.css';
import Background from '../../stylesheets/background.png';


class MainPage extends React.Component {

  render() {
    return (
      <div className='main-everything'>
        <div className='main-all-2'>
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
        <img className='background' src={Background}/>
      </div>
    );
  }
}

export default MainPage;