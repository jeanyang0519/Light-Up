import React from 'react';
import { Link } from 'react-router-dom';
import NavContainer from '../nav/navbar_container';
import '../../stylesheets/index.css';


class Index extends React.Component {

  componentDidMount() {
    
    return this.props.fetchUsers();
  }

  render() {

    let connections = [];
    // this.props.connections.map((connection, i) => {
    //   return (
    //     <Link className='user-profile' to={`/profile/${connection.user._id}`} key={i}>
    //       <li className='each-user' key={connection.user._id}>{connection.user.username}</li>
    //     </Link>
    //   )
    // })
    let arr = [];
      this.props.users.forEach((user, i) => {
        for (let j = 0; j < this.props.connections.length; j++) {
            let connection = this.props.connections[j];
            if (user.id === connection.user._id) {
              return connections.push(
                <Link className='user-profile' to={`/profile/${user.id}`} key={i}>
                  <li className='each-user' key={user.id}>{user.username}</li>
                </Link>
              )
            } else {
               return arr.push(
                <Link className='user-profile' to={`/profile/${user.id}`} key={i}> 
                  <li className='each-user' key={user.id}>{user.username}</li>
                </Link>
              )
            }  
        }
          
      })
      debugger
      return(
        
      <div className='index-all'>
        {/* <NavContainer/> */}
        <div className='connections-wrapper'>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='connection'>
            {connections}
          </div>
        </div>
        <div className='user-wrapper'>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='user'>
            {arr}
          </div>
        </div>
      </div>
    )
  }



}

export default Index;