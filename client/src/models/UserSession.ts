import { UserType } from './UserType';

export default class UserSession {
  public id: string;
  public email: string;
  public name: string;
  public type: UserType;
  public instagram: boolean;
  public roles: string[];
}
