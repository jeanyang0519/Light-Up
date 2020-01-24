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


    const connected = this.props.users.filter(user => user.id in connections && connections[user.id] === 2).map((connection, i) => {
      
      return (
            <Link className='user-profile-connected' to={`/profile/${connection.id}`} key={i}>
    <li className='each-user-connected' key={connection.id}>{connection.first_name} {connection.last_name}</li>
            </Link>
          )
    });
    const notConnected = this.props.users.filter(user => !(user.id in connections) && user.id !== this.props.currentUser.id).map((connection, i) => {
      return (
          <Link className='user-profile' to={`/profile/${connection.id}`} key={i}>
    <li className='each-user' key={connection.id}>{connection.first_name} {connection.last_name}</li>
          </Link>
        )
      });;

    return (
      <div className="index-all">
        <div className="wrapper">
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <h1>Your Connections</h1>
          {connected.length === 0 ? (
            <div className="noconnection-msg">
              Looks like you don't have connections. 
              <br/>
              Reach out! Expand your network.
            </div>
          ) : (
            <div className="user">{connected}</div>
          )}
        </div>
        <div className="wrapper">
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
            rel="stylesheet"
          ></link>
          <h1>Find Connections</h1>
          <div className="user">{notConnected}</div>
        </div>

      </div>
    );
  }



}

export default Index;