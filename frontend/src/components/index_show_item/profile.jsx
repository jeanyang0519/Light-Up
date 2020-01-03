import React from 'react';
import './profile.css';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  componentDidUpdate(prev) {
    if (prev.match.params.id !== this.props.match.params.id) {
      this.props.fetchUser(this.props.match.params.id);
    }
  }

  render() {
    if (!this.props.profile) return null; 
    const profile = this.props.profile;
    return (
      <main className="profile-all">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        <section className="profile-body">
          <div className="main-content">
            <div className="picture-container">
              <div className="picture">

              </div>
                <Link to="/profile/edit" profile={profile}>Edit</Link>
            </div>
            <ul>
              <li>fnamelname{profile.first_name} {profile.last_name}</li>
              <li>location{profile.location}</li>
              <li>{profile.userType}</li>
            </ul>
        <button onClick={() => this.props.requestConnection({userId: this.props.currentUser.id, connectionId: profile.id})}> 
          Connect
        </button>
        {/* <button onClick={() => this.props.acceptConnection({userId: this.props.currentUser.id, connectionId: profile.id})}> 
          Accept Connection
        </button>
        <button onClick={() => this.props.removeConnection({userId: this.props.currentUser.id, connectionId: profile.id})}> 
          Reject Connection
        </button> */}
          </div>
        <div className="about-div">
          <ul>
            <h2>About</h2>
            <li>Description{profile.description}</li>
          </ul>
        </div>
        <div className="skills-div">
          <ul>
            <li>Skills{profile.skills}</li>
          </ul>
        </div>
        <div className="interests-div">
          <ul>
            <li>Interests{profile.interests}</li>
          </ul>
        </div>
        </section>
        
       
        
        

        

      </main>
    )
  }
}

export default Profile;