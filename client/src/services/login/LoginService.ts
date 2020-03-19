import axios, { AxiosResponse } from 'axios';
import LoginCredentials from '../../models/LoginCredentials';
import TokenResult from '../../models/TokenResult';

class LoginService {
  public static login(credentials: LoginCredentials): Promise<AxiosResponse<TokenResult>> {
    const enc = btoa(`${credentials.email}:${credentials.password}`);
    const headers = {
      Authorization: `Basic ${enc}`,
    };

    return axios.post<TokenResult>('/login', {}, { headers });
  }

  public static refreshToken(): Promise<AxiosResponse<TokenResult>> {
    return axios.put<TokenResult>('/refresh-token');
  }
}

export default LoginService;
