import { LOG_USER_IN, LOG_USER_OUT } from '../actions/session';
import UserSession from '../../models/UserSession';

interface ISessionState {
  isLoggedIn: boolean;
  token: string;
  user: UserSession;
}

interface ISessionAction {
  type: string;
  token: string;
  user: UserSession;
}

const initialState: ISessionState = {
  isLoggedIn: false,
  token: null,
  user: null,
};

function SessionReducer(state: ISessionState = initialState, action: ISessionAction) {
  switch (action.type) {
    case LOG_USER_IN:
      return {
        ...state,
        isLoggedIn: true,
        token: action.token,
        user: action.user,
      };
    case LOG_USER_OUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        name: null,
      };
    default:
      return state;
  }
}

export default SessionReducer;
