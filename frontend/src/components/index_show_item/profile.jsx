import React from 'react';
import '../../stylesheets/profile.css';
import '../../stylesheets/reset.css';

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
            
            <div>
              <div>Name{profile.first_name} {profile.last_name}</div>
              <div>Location{profile.location}</div>
            </div>

            <div className='main-content-right'>
              {/* <div className='user-type'>{profile.userType}</div> */}
              
              <button onClick={() => this.props.requestConnection({userId: this.props.currentUser.id, connectionId: profile._id})}> 
                Connect
              </button>
            </div>
          </div>

        <div className="about-div">
          <div className='about-inside'>
            <h2>About</h2>
            <div className='user-type'>{profile.userType}</div>
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