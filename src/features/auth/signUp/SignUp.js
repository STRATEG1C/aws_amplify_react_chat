import React, { useState } from 'react';
import { signUp } from '../../../app/auth/authThunk';
import { connect } from 'react-redux';

const initSignUpForm = {
  username: '',
  email: '',
  password: ''
};

const SignUp = ({ signUp }) => {
  const [signUpForm, setSignUpForm] = useState(initSignUpForm);

  const onInputChange = (name, e) => {
    setSignUpForm({
      ...signUpForm,
      [name]: e.target.value
    });
  };

  const onSignUp = () => {
    signUp(signUpForm.username, signUpForm.email, signUpForm.password);
  }

  return (
    <fieldset>
      <legend>Sign Up Form</legend>
      <div>
        <label htmlFor="email">Username: </label>
        <input name="email" type="text" value={signUpForm.username} onChange={onInputChange.bind(this, 'username')} />
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input name="email" type="text" value={signUpForm.email} onChange={onInputChange.bind(this, 'email')} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input name="password" type="text" value={signUpForm.password} onChange={onInputChange.bind(this, 'password')} />
      </div>
      <button onClick={onSignUp}>Click</button>
    </fieldset>
  );
};

const mapStateToProps = state => ({
  counter: state.counter,
});

const mapDispatchToProps = {
  signUp
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
