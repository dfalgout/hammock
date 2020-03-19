import Cookies from 'universal-cookie';
import LoginCredentials from '../../models/LoginCredentials';
import UserSession from '../../models/UserSession';
import LoginService from '../../services/login/LoginService';

export const LOG_USER_IN = 'session/LOG_USER_IN';
export const LOG_USER_OUT = 'session/LOG_USER_OUT';

export const login = (token: string) => {
  const parts = token.split('.');
  const payload = JSON.parse(atob(parts[1]));
  const user = new UserSession();
  user.id = payload.id;
  user.email = payload.email;
  user.name = payload.name;
  user.roles = payload.roles;
  user.type = payload.type;

  return { type: LOG_USER_IN, token, user };
};

export const logUserIn = (credentials: LoginCredentials) => {
  const cookies = new Cookies();
  return async (dispatch: any) => {
    const token = await LoginService.login(credentials);
    if (token.data !== undefined) {
      cookies.set('access_token', token.data.token);
      dispatch(login(token.data.token));
    }
  };
};

export const refreshToken = () => {
  const cookies = new Cookies();
  return async (dispath: any) => {
    const token = await LoginService.refreshToken();
    if (token.data) {
      cookies.set('access_token', token.data.token);
      dispath(login(token.data.token));
    }
  };
};

export const logUserOut = () => {
  const cookies = new Cookies();
  cookies.remove('access_token');
  return { type: LOG_USER_OUT };
};
