import { RoleType } from './RoleType';
import { UserType } from './UserType';
import CreateUserForm from './CreateUserForm';

export default class CreateUser {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public userType: UserType;
  public roleType: RoleType;

  constructor(createUserForm: CreateUserForm, userType: UserType, roleType: RoleType) {
    this.email = createUserForm.email;
    this.firstName = createUserForm.firstName;
    this.lastName = createUserForm.lastName;
    this.password = createUserForm.password;
    this.userType = userType;
    this.roleType = roleType;
  }
}
