import React from 'react';
import Logo from '../../stylesheets/idea.png';
import { Link } from 'react-router-dom';
// import './index.scss';

class Index extends React.Component {

  componentDidMount() {
    return this.props.fetchUsers();
  }

  render() {
      const users = this.props.users.map((user, i) => {
        return (
          <Link to={`/profile/${user._id}`} key={i}> 
            <li key={user._id}>{user.username}</li>
          </Link>
        )
      })

    return(
      <main>
        <header className="index-nav">
          <section className="left-index">
            <Link to="/">
              <img src={Logo} alt="login-logo" />
              <h2>Light Up</h2>
            </Link>
          </section>
          <section className="right-index">
            <div>
              <Link to="/dashboard">
              Home
              </Link>
            </div>
            <div>
              <Link to="/messaging">
                Messaging
              </Link>
            </div>
            <div>
              <Link to="/profile">
                Profile
              </Link>
            </div>
          </section>
        </header>

        <ul>
          {users}
        </ul>

        ayer
      </main>
    )
  }



}

export default Index;