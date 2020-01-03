import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../stylesheets/login.css';
import '../../stylesheets/greeting.css'
import Logo from '../../stylesheets/idea.png';
import '../../stylesheets/reset.css';

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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.currentUser === true) {
  //     this.props.history.push('/');
  //   }

  //   this.setState({ errors: nextProps.errors })
  // }

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

    this.props.login(user).then(() => {
      this.props.history.push("/dashboard");
      this.setState({
        email: "",
        password: ""
      });
    })
    
    
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
      <div className="login-all">
        <div className='main-all'>
         
          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
          <div className='main-header-1'>
            <img className="logo" src={Logo} alt="login-logo" />
            <Link to="/" className='title'>Light Up</Link>
          </div>
          <div className="main-header-3">
            {/* <Link className='log-in' to={'/login'}>Log in</Link> */}
            <Link className="get-started" to={'/signup'}>Sign Up</Link>
          </div>

        </div>
        {/* <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        <div className="login-header">
          <div className="login-logo">
            <Link to="/">
              <img classroom="logo" src={Logo} alt="login-logo"/>
              <h2>Light Up</h2>
            </Link>
          </div>
          <div className="login-signup">
            <Link to="/signup" >
              Sign Up
            </Link>
          </div>
        </div> */}
        <form onSubmit={this.handleSubmit} className="login-form">
            <div className='login-form-wapper'>
              <div className='login-title'>Log In</div>
            
              <input type="text"
                className="field"
                value={this.state.email}
                onChange={this.update('email')}
                placeholder="Email"
              />
              
              <input type="password"
                className="field"
                value={this.state.password}
                onChange={this.update('password')}
                placeholder="Password"
              />
              
              {/* <div className="login-button"> */}
                <input type="submit" value="Submit" className="login-submit" />
              {/* </div> */}
              {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
