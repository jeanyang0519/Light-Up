import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/reset.css';
import '../../stylesheets/signup.css';
import '../../stylesheets/nav.css';
import '../../stylesheets/greeting.css'
import Logo from '../../stylesheets/idea.png';
import user from '../../stylesheets/user.png';
import chat from '../../stylesheets/chat.png';
import setting from '../../stylesheets/setting.png';
import ModalContainer from '../modal/modal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    
  }

 
  render() {
    
    return (
      <div>
        <div className='nav-all'>


          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='main-header-1'>
            <img className="logo" src={Logo} alt="login-logo" />
            <Link to="/" className='title'>Light Up</Link>
          </div>
          <div className="nav-header-right">
            
            {/* <Link className="get-started" to={'/login'}>Log in</Link> */}
            <Link className="nav-link" to={`/profile/${this.props.currentUser.id}`}>
              <img className='nav-img' src={user}/>
            </Link>
            <Link className="nav-link" to={'/chat'}>
              <img className="nav-img" src={chat}/>
            </Link>
            <img className="nav-img" src={setting} onClick={() => (this.props.openModal('logoutOption'))}/>
            <ModalContainer />
          </div>

        </div>
      </div>
    );
  }
}

export default NavBar;