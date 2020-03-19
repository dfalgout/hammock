import axios, { AxiosResponse } from 'axios';
import User from '../../models/User';

class LinkSocialMediaService {
  public static linkInstagram(id: string, token: string, expiration: number): Promise<AxiosResponse<User>> {
    return axios.put<User>(`/users/${id}/link-instagram`, {
      token,
      expiration,
    });
  }
}

export default LinkSocialMediaService;
