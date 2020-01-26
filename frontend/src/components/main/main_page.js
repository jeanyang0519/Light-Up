import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../stylesheets/idea.png';
import '../../stylesheets/reset.css';
import '../../stylesheets/greeting.css';
import Background from '../../stylesheets/lightup.png';
import splash from '../../stylesheets/splash.png';

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
       <div className='background-container'>
          
            
          <img className='background' src={Background}/>
            
          <div className="slogan-container">

            <div className="slogans">

            
                <div className='slogan'>
                  Brighten
                  <br/>
                  Your Future
                </div>
                

                <div className='sub-slogan'>
                  A mentorship community for students to connect over shared interests and goals. 
                </div>
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}

export default MainPage;