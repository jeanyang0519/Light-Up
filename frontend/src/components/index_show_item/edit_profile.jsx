import React from 'react';
import './edit.css';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: this.props.currentUser.first_name || '',
      last_name: this.props.currentUser.last_name || '',
      location: this.props.currentUser.location || '',
      userType: this.props.currentUser.userType || '',
      description: this.props.currentUser.description || '',
      skills: this.props.currentUser.skills || '',
      interests: this.props.currentUser.interests || '',
      selectedMentor: false,
      selectedMentee: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.updateMentor = this.updateMentor.bind(this);
    this.updateMentee = this.updateMentee.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    const updateForm = Object.assign({}, this.state);
    this.props.update(this.props.currentUser.id, updateForm)
      .then(() => {
        if (this.props.errors.length === 0) {
          this.props.history.push(`/profile/${this.props.currentUser.id}`);
        } else {
          this.scrollToTop();
        }
      }
    );
    this.setState(this.state);
  }

  scrollToTop () {
    window.scrollTo(0, 0);
  }

  renderErrors() {
    return (
      <ul className="login-errors">
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  updateMentor(field) {
    if (this.state.selectedMentor === false && this.state.selectedMentee === false) {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentor: true
      })
    } else if (this.state.selectedMentor === false && this.state.selectedMentee === true) {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentor: true,
        selectedMentee: false
      });
    } else {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentor: false
      })
    }
  }

  updateMentee(field) {
    if (this.state.selectedMentee === false && this.state.selectedMentor === false) {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentee: true
      })
    } else if (this.state.selectedMentee === false && this.state.selectedMentor === true) {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentee: true,
        selectedMentor: false
      });
    } else {
      return e => this.setState({
        [field]: e.target.value,
        selectedMentee: false
      })
    }
  }


  render() {
    if (!this.props.currentUser) return null;
    return (
      <main>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        <section className="form-container">
          <form onSubmit={this.handleSubmit} className="edit-form" >
            {this.renderErrors()}
            <div className="fname">
              <h2>First Name</h2>
              <input type="text" className="whatever"
                value={this.state.first_name}
                onChange={this.update("first_name")}>
              </input>
            </div>
            <div className="lname">
              <h2>Last Name</h2>
              <input type="text" className="whatever"
                value={this.state.last_name}
                onChange={this.update("last_name")}>
              </input>
            </div>
            <div className="location">
              <h2>Location</h2>
              <input type="text" className="whatever"
                value={this.state.location}
                onChange={this.update("location")}>
              </input>
            </div>
            <div className="usertype">
              <h2>Who are you?</h2>
              <div className="button-div" id="button-div">
                <button type="button" onClick={this.updateMentor("userType")} id={this.state.selectedMentor === true ? "selected" : "mentor"} value="Mentor">
                  Mentor
                  </button>
                <button type="button" onClick={this.updateMentee("userType")} id={this.state.selectedMentee === true ? "selected" : "mentee"} value="Mentee">
                  Mentee
                  </button>
                </div>
            </div>
            <div className="description">
              <h2>Description</h2>
              <input type="text" className="whatever"
                value={this.state.description}
                onChange={this.update("description")}>
              </input>
            </div>
            <div className="skills">
              <h2>Skills</h2>
              <input type="text" className="whatever"
                value={this.state.skills}
                onChange={this.update("skills")}>
              </input>
            </div>
            <div className="interests">
              <h2>Interests</h2>
              <input type="text" className="whatever"
                value={this.state.interests}
                onChange={this.update("interests")}>
              </input>
            </div>
            <button type="submit" onClick={this.handleSubmit}>
              <h2 className="submit-button">Submit</h2>
            </button>
          </form>
        </section>
      </main>
    )
  }
}

  export default EditProfile;