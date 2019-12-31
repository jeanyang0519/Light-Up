import React from 'react';

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


    return (
      <main>
        <button onClick={() => this.props.requestConnection({userId: this.props.currentUser.id, connectionId: this.props.profile._id})}> 
          Connection
        </button>
        {this.props.profile.username}
        

      </main>
    )
  }
}

export default Profile;