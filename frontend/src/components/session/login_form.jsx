import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../stylesheets/login.scss';
import Logo from '../../stylesheets/idea.png';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push('/');
    }

    this.setState({ errors: nextProps.errors })
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>
            {this.state.errors[error]}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="login-page">
        <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet"></link>
        <header className="login-nav">
          <div className="login-logo">
            <Link to="/">
              <img src={Logo} alt="login-logo"/>
              <h2>Light Up</h2>
            </Link>
          </div>
          <div className="login-signup">
            <Link to="/signup" >
              Sign Up
            </Link>
          </div>
        </header>
        <form onSubmit={this.handleSubmit} className="login-form">
          <h2>Log In</h2>
          <div>
            <input type="text"
              className="field"
              value={this.state.email}
              onChange={this.update('email')}
              placeholder="Email"
            />
            <br />
            <input type="password"
              className="field"
              value={this.state.password}
              onChange={this.update('password')}
              placeholder="Password"
            />
            <br />
            <div className="login-button">
            <input type="submit" value="Submit" className="login-submit" />
            </div>
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
