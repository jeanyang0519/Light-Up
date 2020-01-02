import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/navbar_container';
import '../../stylesheets/index.css';


class Index extends React.Component {

  componentDidMount() {
    
    return this.props.fetchUsers();
  }

  render() {
    
      const users = this.props.users.map((user, i) => {
        return (
          <Link className='user-profile' to={`/profile/${user._id}`} key={i}> 
            <li className='each-user' key={user._id}>{user.username}</li>
          </Link>
          //comment
        )
      })

    return(
        
      <div className='index-all'>
        {/* <NavContainer/> */}
        <div className='user-wrapper'>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='user'>
            {users}
          </div>
        </div>
      </div>
    )
  }



}

export default Index;