import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/navbar_container';


class Index extends React.Component {

  componentDidMount() {
    return this.props.fetchUsers();
  }

  render() {
    debugger
      const users = this.props.users.map((user, i) => {
        return (
          <Link to={`/profile/${user._id}`} key={i}> 
            <li key={user._id}>{user.username}</li>
          </Link>
        )
      })

    return(
        
      <div>
        <NavContainer/>
        <ul>
          {users}
        </ul>
      </div>
    )
  }



}

export default Index;