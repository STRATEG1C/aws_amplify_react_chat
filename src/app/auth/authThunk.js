import { setAccessToken, setIdToken, setRefreshToken, setCurrentUser, getCurrentUser } from './authSlice';
import { Auth, API } from 'aws-amplify';
import { history } from '../../App';
import store from '../store';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';

export const logIn = (email, password) => async dispatch => {
  try {
    const { signInUserSession, attributes } = await Auth.signIn(email, password);
    dispatch(setAccessToken(signInUserSession.getAccessToken().getJwtToken()));
    dispatch(setIdToken(signInUserSession.getIdToken().getJwtToken()));
    dispatch(setRefreshToken(signInUserSession.getRefreshToken().getToken()));
    dispatch(getOrCreateUser(attributes));
  } catch (err) {
    console.log(err);
  }
};

export const getOrCreateUser = (attributes) => async dispatch => {
  let userData;

  const listUsersReq = await API.graphql({
    query: queries.listUsers,
    variables: {
      cognitoId: attributes.sub
    }
  });
  userData = listUsersReq.data.listUsers[0];

  if (!userData || !userData.id) {
    const userDetails = {
      id: Date.now(),
      cognitoID: attributes.sub,
      username: attributes.nickname
    }

    const createUserReq = await API.graphql({
      query: mutations.createUser,
      variables: {
        input: userDetails
      }
    });
    userData = createUserReq.data.getUser;
  }

  dispatch(setCurrentUser({
    ...userData
  }))

  history.push('/');
}

export const signUp = (nickname, email, password) => async dispatch => {
  try {
    await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        nickname
      }
    });
    history.push('/login');
  } catch (err) {
    console.log(err);
  }
};
