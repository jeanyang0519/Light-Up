import React from 'react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.currentUser.first_name || '',
      last_name: this.props.currentUser.first_name || '',
      location: this.props.currentUser.location || '',
      userType: this.props.currentUser.userType || '',
      description: this.props.currentUser.description || '',
      skills: this.props.currentUser.skills || '',
      interests: this.props.currentUser.interests || ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const updateForm = Object.assign({}, this.state);
    this.props.update(this.props.currentUser.id, updateForm)
      .then(() => this.props.history.push(`/profile/${this.props.currentUser.id}`))
    this.setState(this.state)
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  render() {
    return (
      <main>
        <form onSubmit={this.handleSubmit}>
          First Name
          <input type="text" className="whatever"
            value={this.state.first_name}
            onChange={this.update("first_name")}>
          </input>
          Last Name
          <input type="text" className="whatever"
            value={this.state.last_name}
            onChange={this.update("last_name")}>
          </input>
          Location
          <input type="text" className="whatever"
            value={this.state.location}
            onChange={this.update("location")}>
          </input>
          userType
          <input type="text" className="whatever"
            value={this.state.userType}
            onChange={this.update("userType")}>
          </input>
          Description
          <input type="text" className="whatever"
            value={this.state.description}
            onChange={this.update("description")}>
          </input>
          Skills
          <input type="text" className="whatever"
            value={this.state.skills}
            onChange={this.update("skills")}>
          </input>
          Interests
          <input type="text" className="whatever"
            value={this.state.interests}
            onChange={this.update("interests")}>
          </input>
          <button type="submit" onClick={this.handleSubmit}>
            Submit
          </button>
        </form>
      </main>
    )
  }
}

  export default EditProfile;