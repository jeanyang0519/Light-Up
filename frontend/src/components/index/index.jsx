import React from 'react';
import { Link } from 'react-router-dom';
import { userConnections } from '../../util/selectors';
import '../../stylesheets/index.css';


class Index extends React.Component {

  componentDidMount() {
    
    return this.props.fetchUsers();
  }
  
  render() {
    
    if (this.props.users.length === 0) return null;
    const connections = userConnections(this.props.currentUser);


    const connected = this.props.users.filter(user => user.id in connections).map((connection, i) => {
      
      return (
            <Link className='user-profile-connected' to={`/profile/${connection.id}`} key={i}>
              <li className='each-user-connected' key={connection.id}>{connection.username}</li>
            </Link>
          )
    });
    const notConnected = this.props.users.filter(user => !(user.id in connections)).map((connection, i) => {
      return (
          <Link className='user-profile' to={`/profile/${connection.id}`} key={i}>
            <li className='each-user' key={connection.id}>{connection.username}</li>
          </Link>
        )
      });;

     

        if (connected.length === 0) {
          return (

            <div className='index-all'>
              <div className='wrapper'>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
                <h1>Your Connections</h1>
                <div>
                  Expand your network. Be brave!
            </div>
              </div>
              <div className='wrapper'>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
                <h1>Explore Your Connections</h1>
                <div className='user'>
                  {notConnected}
                </div>
              </div>
            </div>
          )
          
        } else {

          return (

            <div className='index-all'>
              <div className='wrapper'>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
                <h1>Your Connections</h1>
                <div className='user'>{connected}</div>
              </div>
              <div className='wrapper'>
                <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
                <h1>Explore Your Connections</h1>
                <div className='user'>
                  {notConnected}
                </div>
              </div>
            </div>
          )
        }
        
      


      
  }



}

export default Index;