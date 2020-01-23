import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/profile.css';
import '../../stylesheets/reset.css';


class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.renderUserType = this.renderUserType.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.connectButton = this.connectButton.bind(this)
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

  renderEditButton() {
    if (this.props.profile.id !== this.props.currentUser.id) {
    return null;
    } else {
      return <div className="edit-button"><Link to={`/profile/${this.props.currentUser.id}/edit`}>Edit Profile</Link></div>
    }
  }
  connectButton () {
    let connected = "Connect"
    let event = this.props.requestConnection
    const { profile, currentUser } = this.props
    let disabled = false
    if (!profile || !this.props.currentUser.connections) return ""
    const connections = this.props.currentUser.connections
    if (profile.id === currentUser.id) {
      return ""
    }
    connections.forEach(connection => {
      if ((connection.user._id === profile.id) && (connection.status === 2)) {
        connected = "Connected"
        event = ""
      } else if (connection.user._id === profile.id && connection.status === 0) {
        connected = "Pending"
        event = ""
      } else if (connection.user._id === profile.id && connection.status === 1) {
        connected = "Accept Request"
        event = this.props.acceptConnection
      }
    })
    if (connected === "Pending" || connected === "Connected") {
      disabled = true
    }
    return (
      <button onClick={(event !== "") ? ()=> event({
                userId: currentUser.id,
                connectionId: profile.id
              }) : event} className={(connected === "Accept Request") ? "Accept" : connected} 
        disabled={disabled}>{connected}</button>
    )
  }

  render() {
    if (!this.props.profile) return null;
    const profile = this.props.profile;
    const connections = this.props.profile.connections
    const connectionsLis = connections.map((connection, i) => {
        const fullname =
        connection.user.first_name && connection.user.last_name
          ? `${connection.user.first_name} ${connection.user.last_name}`
          : "";
      if (connection.status === 2) {
        return (
          <Link key={i} to={`/profile/${connection.user._id}`}>
            <h2>
              {fullname}
            </h2>
            <h2>
              {connection.user.username}
            </h2>
          </Link>
        );
      }
    })
    const pendingConnections = connections.map((connection, i) => {
        const fullname = (connection.user.first_name && connection.user.last_name) ? `${connection.user.first_name} ${connection.user.last_name}` : ''
        if (connection.status === 1) {
        return (
          <Link key={i} to={`/profile/${connection.user._id}`}>
            <p>
              {fullname}
            </p>
            <div className='pending-button'>
              <p>{connection.user.username}</p>
              <button
                onClick={() => this.props.acceptConnection({
                  userId: this.props.currentUser.id,
                  connectionId: connection.user._id
                })}
              >Accept Connection</button>
            
              <button onClick={() =>
                this.props.removeConnection({
                  userId: this.props.currentUser.id,
                  connectionId: connection.user._id
                })
              }>Reject Connection</button>
            </div>
          </Link>
        );
      }
    })
    return (
      <main className="profile-all">
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap"
          rel="stylesheet"
        ></link>
        <section className="profile-body">
          <div className="main-content">            
            <div className='profile-info'>
              <div className="profile-info-1">
                <div className='profile-name'>{!profile.first_name ? profile.username : profile.first_name} {profile.last_name}</div>
                  {this.renderEditButton()}
                  {this.connectButton()}
              </div>
              <div className='profile-location'>{profile.location}</div>
            </div>
          </div>

          <div className="about-div">
            <div className="about-inside">
              <h2>About</h2>
              {this.renderUserType()}
              {/* <div className='user-type'>{profile.userType}</div> */}
            </div>
            <div className='div-content'>{profile.description}</div>
          </div>

          <div className="skills-div">
            <div className="about-1">
              <h2>Skills</h2>
            </div>
            <div className='div-content'>{profile.skills}</div>
          </div>

          <div className="interests-div">
            <div className="about-1">
              <h2>Interests</h2>
            </div>
            <div className='div-content'>{profile.interests}</div>
          </div>

          <div className="interests-div">
            <div className="about-1">
              <h2>Connections</h2>
            </div>
            <div className='div-content'>{connectionsLis}</div>
          </div>
          {(profile.id !== this.props.currentUser.id) ? "" :
            <div className="interests-div">
              <div className="about-1">
                <h2>Pending Connections</h2>
              </div>
              <div className='pending-content'>{pendingConnections}</div>
            </div>
          }
        </section>
      </main>
    );
  }
}

export default Profile;