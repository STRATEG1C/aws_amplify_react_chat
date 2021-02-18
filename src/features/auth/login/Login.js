import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../../app/auth/authThunk';

const initLoginForm = {
  email: '',
  password: ''
};

const Login = ({ logIn }) => {
  const [loginForm, setLoginForm] = useState(initLoginForm);

  const onInputChange = (name, e) => {
    setLoginForm({
      ...loginForm,
      [name]: e.target.value
    });
  };

  const onLogin = () => {
    logIn(loginForm.email, loginForm.password);
  }

  return (
    <fieldset>
      <legend>Login Form</legend>
      <div>
        <label htmlFor="email">Email: </label>
        <input name="email" type="text" value={loginForm.email} onChange={onInputChange.bind(this, 'email')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input name="password" type="text" value={loginForm.password} onChange={onInputChange.bind(this, 'password')} />
      </div>
      <button onClick={onLogin}>Click</button>
    </fieldset>
  );
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = {
  logIn
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
