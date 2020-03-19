import axios, { AxiosResponse } from 'axios';
import User from '../../models/User';
import CreateUser from '../../models/CreateUser';

const resourcePath: string = '/users';

class UserService {
  public static create(createUser: CreateUser): Promise<AxiosResponse<User>> {
    return axios.post<User>(resourcePath, createUser);
  }

  public static update(user: User): Promise<AxiosResponse<User>> {
    return axios.put<User>(`${resourcePath}/${user.id}`, user);
  }

  public static getAll(): Promise<AxiosResponse<User[]>> {
    return axios.get<User[]>(resourcePath);
  }

  public static getOne(id: string): Promise<AxiosResponse<User>> {
    return axios.get<User>(`${resourcePath}/${id}`);
  }

  public static emailExists(email: string): Promise<AxiosResponse<boolean>> {
    return axios.put<boolean>('/email-exists', { email });
  }
}

export default UserService;
