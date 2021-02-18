import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ currentUser, ...props }) => {
  if (currentUser) {
    return <Route {...props} />
  }

  return <Redirect to="/login" />
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute);
