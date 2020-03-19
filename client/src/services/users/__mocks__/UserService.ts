import User from '../../../models/User';
import { getOne, getAll } from './UserServiceStubs';
import CreateUser from '../../../models/CreateUser';

class UserService {
  public static create(createUser: CreateUser): Promise<User> {
    const user = getOne();
    return Promise.resolve(user);
  }

  public static update(user: User): Promise<User> {
    return Promise.resolve(user);
  }

  public static getAll(): Promise<User[]> {
    const users = getAll();
    return Promise.resolve(users);
  }

  public static getOne(id: string): Promise<User> {
    const user = getOne();
    user.id = id;
    return Promise.resolve(user);
  }
}

export default UserService;
