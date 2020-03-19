import User from '../../../models/User';
import CreateUserForm from '../../../models/CreateUserForm';
import { GenderType } from '../../../models/GenderType';
import { Address } from '../../../models/Address';

const user = new User();
user.id = '1111';
user.email = 'test@email.com';
user.firstName = 'John';
user.lastName = 'Doe';
user.birthDate = '07/13/1983';
user.gender = GenderType.MALE;
user.shippingAddress = new Address();

const user2 = new User();
user.id = '2222';
user.email = 'example@email.com';
user.firstName = 'Jane';
user.lastName = 'Doe';
user.birthDate = '11/07/1989';
user.gender = GenderType.FEMALE;
user.shippingAddress = new Address();

export const getOne = () => {
  return user;
};

export const getAll = () => {
  return [
    user,
    user2,
  ];
};

export const getCreateUserForm = () => {
  const user = getOne();
  const createUserForm = new CreateUserForm();
  createUserForm.email = user.email;
  createUserForm.firstName = user.firstName;
  createUserForm.lastName = user.lastName;
  createUserForm.password = 'password';
  return createUserForm;
};
