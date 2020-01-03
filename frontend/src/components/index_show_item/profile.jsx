import React from 'react';
<<<<<<< HEAD
=======

>>>>>>> f4d8dd63ea09954b560fdf3399b07d9eb9f24e52
import { Link } from 'react-router-dom';
import '../../stylesheets/profile.css';
import '../../stylesheets/reset.css';


class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.renderUserType = this.renderUserType.bind(this);
  }

  componentDidMount() {
    this.props.fetchUser(this.props.match.params.id);
  }

  componentDidUpdate(prev) {
    if (prev.match.params.id !== this.props.match.params.id) {
      this.props.fetchUser(this.props.match.params.id);
    }
  }

  renderUserType() {
    if (this.props.profile.userType === 'Mentor') {
      return <div className='user-type-1'>{this.props.profile.userType}</div>
    } else {
      return <div className='user-type-2'>{this.props.profile.userType}</div>
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
            
            <div className='profile-info'>
              <div className='profile-name'>Name{profile.first_name} {profile.last_name}</div>
              <div className='profile-location'>Location{profile.location}</div>
            </div>
<<<<<<< HEAD
=======
              {/* </div> */}
>>>>>>> f4d8dd63ea09954b560fdf3399b07d9eb9f24e52
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
        <button onClick={() => this.props.acceptConnection({userId: this.props.currentUser.id, connectionId: profile.id})}> 
          Accept Connection
        </button>
        <button onClick={() => this.props.removeConnection({userId: this.props.currentUser.id, connectionId: profile.id})}> 
          Reject Connection
<<<<<<< HEAD
        </button>
=======
        </button> */}
          {/* </div> */}
>>>>>>> f4d8dd63ea09954b560fdf3399b07d9eb9f24e52

        <div className="about-div">
          <div className='about-inside'>
            <h2>About</h2>
              {this.renderUserType()}
            {/* <div className='user-type'>{profile.userType}</div> */}
          </div>
            <div>{profile.description}</div>
        </div>

        <div className="skills-div">
          <div className='about-1'>
            <h2>Skills</h2>
          </div>
            <div>{profile.skills}</div>
        </div>

        <div className="interests-div">
          <div className='about-1'>
            <h2>Interests</h2>
          </div>
            <div>{profile.interests}</div>
        </div>

        </section>
      </main>
    )
  }
}

export default Profile;