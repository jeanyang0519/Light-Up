import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/signup.css';
import Logo from '../../stylesheets/idea.png';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // this.logoutUser = this.logoutUser.bind(this);
    // this.getLinks = this.getLinks.bind(this);
  }

  // logoutUser(e) {
  //   e.preventDefault();
  //   this.props.logout();
  // }

  // getLinks() {
  //   if (this.props.loggedIn) {
  //     return (
  //       <div>
  //         <Link to={'/messaging'}>Messaging</Link>
  //         <Link to={'/profile'}>Profile</Link>
  //         <button onClick={this.logoutUser}>Logout</button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <Link to={'/signup'}>Sign up</Link>
  //         <Link to={'/login'}>Login</Link>
  //       </div>
  //     );
  //   }
  // }

  render() {
    return (
      <div>
        <div className='main-all'>


          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='main-header-1'>
            <img className="logo" src={Logo} alt="login-logo" />
            <Link to="/" className='title'>Light Up</Link>
          </div>
          <div className="main-header-3">
            {/* <Link className='log-in' to={'/login'}>Log in</Link> */}
            <Link className="get-started" to={'/login'}>Log in</Link>
          </div>

        </div>
      </div>
    );
  }
}

export default NavBar;