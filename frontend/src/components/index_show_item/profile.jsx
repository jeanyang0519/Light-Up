import React from 'react';
import { Link } from 'react-router-dom';
import '../../stylesheets/profile.css';
import '../../stylesheets/reset.css';


class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.renderUserType = this.renderUserType.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
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
      return <div className="edit-button"><Link to={`/profile/${this.props.currentUser.id}/edit`}>Edit</Link></div>
    }
  }
  connectButton () {
    let connected = "Connect"
    const { profile, currentUser } = this.props
    let disabled = false
    if (!profile) return ""
    const connections = currentUser.connections
    if (profile.id === currentUser.id) {
      return ""
    }
    connections.map(connection => {
      if ((connection.user === profile.id) && (connection.status === 2)) {
        connected = "Connected"
      } else if (connection.user === profile.id && connection.status === 0) {
        connected = "Pending"
      } else if (connection.user === profile.id && connection.status === 1) {
        connected = "Accept Request"
      }
    })
    if (connected === "Pending" || connected === "Connected") {
      disabled = true
    }
    return (
      <button className={(connected === "Accept Request") ? "Accept" : connected} 
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
            <h1>
              {fullname}
            </h1>
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
            <h1>
              {fullname}
            </h1>
            <h2>{connection.user.username}</h2>
            <button
              onClick={() => this.props.acceptConnection({
                userId: this.props.currentUser.id,
                connectionId: connection.user.id
              })}
            >
              Accept Connection
            </button>
            <button onClick={() =>
              this.props.removeConnection({
                userId: this.props.currentUser.id,
                connectionId: connection.user.id
              })
            }>Reject Connection</button>
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
              <div className='profile-name'>{profile.first_name} {profile.last_name}</div>
              <div className='profile-location'>{profile.location}</div>
            </div>
                {this.renderEditButton()}
          </div>
        {this.connectButton()}

          <div className="about-div">
            <div className="about-inside">
              <h2>About</h2>
              {this.renderUserType()}
              {/* <div className='user-type'>{profile.userType}</div> */}
            </div>
            <div>{profile.description}</div>
          </div>

          <div className="skills-div">
            <div className="about-1">
              <h2>Skills</h2>
            </div>
            <div>{profile.skills}</div>
          </div>

          <div className="interests-div">
            <div className="about-1">
              <h2>Interests</h2>
            </div>
            <div>{profile.interests}</div>
          </div>

          <div className="interests-div">
            <div className="about-1">
              <h2>Connections</h2>
            </div>
            <div>{connectionsLis}</div>
          </div>
          {(profile.id !== this.props.currentUser.id) ? "" :
            <div className="interests-div">
              <div className="about-1">
                <h2>Pending Connections</h2>
              </div>
                <div>{pendingConnections}</div>
            </div>
          }
        </section>
      </main>
    );
  }
}

export default Profile;