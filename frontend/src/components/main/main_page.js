import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/greeting.scss';

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <h1 className="title">Light Up</h1>
        <Link to={'/login'}>Log in</Link>
        <Link className="get-started" to={'/signup'}>Get Started</Link>
        
      </div>
    );
  }
}

export default MainPage;