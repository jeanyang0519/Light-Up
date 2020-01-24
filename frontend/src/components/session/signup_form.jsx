import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../../stylesheets/signup.css';

import '../../stylesheets/reset.css';

import Logo from '../../stylesheets/idea.png';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      first_name: '',
      last_name: '',
      username: '',
      userType: '',
      password: '',
      password2: '',
      errors: {},
      selectedMentor: false,
      selectedMentee: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.updateMentor = this.updateMentor.bind(this);
    this.updateMentee = this.updateMentee.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.signedIn === true) {
  //     this.props.history.push('/login');
  //   }

  //   this.setState({ errors: nextProps.errors })
  // }

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

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      userType: this.state.userType,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.signup(user).then((e) => {
      if (this.props.errors.length === 0) {
        this.props.history.push("/dashboard");
      }
    });
  }

  componentWillUnmount() {
    if (this.props.errors.length > 0) {
      this.props.clearErrors();
    }
  }

  renderErrors() {
    return (
      <ul className="signup-errors">
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.props.errors[error]}
          </li>
        ))}
      </ul>
    );
  }



  render() {
    return (
      <div className="signup-form-container">
        <div className='main-all'>
 

          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='main-header-1'>
            <img className="logo" src={Logo} alt="login-logo" />
            <Link to="/" className='title'>Light Up</Link>
          </div>
          <div className="main-header-3">
            {/* <Link className='log-in' to={'/login'}>Log in</Link> */}
            <Link className="get-started" to={'/login'}>Log in</Link>
          </div>

        </div>
       
        <form onSubmit={this.handleSubmit} className="signup-form-box">
          <div className="signup-form">
            <div className='signup-form-wapper'>
            <div className='signup-title'>Sign Up</div>
            
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              
            />
            <input
              type="text"
              value={this.state.first_name}
              onChange={this.update("first_name")}
              placeholder="First Name"
              
            />
            <input
              type="text"
              value={this.state.last_name}
              onChange={this.update("last_name")}
              placeholder="Last Name"
              
            />
            <input
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
              placeholder="Username"
              
            />

            <section className="user-type-select">
              <div className='signup-question'>Who are you?</div>
              <div className="signup-buttons" >
                <button type="button" onClick={this.updateMentor("userType")} id={this.state.selectedMentor === true ? "selected" : "mentor"} value="Mentor">
                  Mentor
                </button>
                <button type="button" onClick={this.updateMentee("userType")} id={this.state.selectedMentee === true ? "selected" : "mentee"} value="Mentee">
                  Mentee
                </button>
              </div>
            </section>

            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              
            />

            <input
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
              
            />
            <input className="signup-submit" type="submit" value="Submit"  />
            {this.renderErrors()}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);