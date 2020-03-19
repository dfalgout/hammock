import LoginCredentials from '../../../models/LoginCredentials';
import TokenResult from '../../../models/TokenResult';
import { login } from './LoginServiceStubs';

class LoginService {
  public static login(credentials: LoginCredentials): Promise<TokenResult> {
    const jwt = login();
    return Promise.resolve(jwt);
  }

  public static refreshToken(): Promise<TokenResult> {
    const jwt = login();
    return Promise.resolve(jwt);
  }
}

export default LoginService;
