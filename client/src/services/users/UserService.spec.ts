import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import UserService from './UserService';
import { getOne, getAll, getCreateUserForm } from './__mocks__/UserServiceStubs';
import CreateUser from '../../models/CreateUser';
import { RoleType } from '../../models/RoleType';
import { UserType } from '../../models/UserType';

let mock = null as any;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('User Service', () => {
  describe('#create', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const user = getOne();
      const createUserForm = getCreateUserForm();
      const createUser = new CreateUser(createUserForm, UserType.BRAND, RoleType.STANDARD);
      mock.onPost('/users').reply(200, user);

      setTimeout(async () => {
        const res = await UserService.create(createUser);
        expect(res.data).toEqual(user);

        done();
      });
    });
  });

  describe('#update', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const user = getOne();
      mock.onPut(`/users/${user.id}`, user).reply(200, user);

      setTimeout(async () => {
        const res = await UserService.update(user);
        expect(res.data).toEqual(user);

        done();
      });
    });
  });

  describe('#getAll', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const users = getAll();
      mock.onGet(`/users`).reply(200, users);

      setTimeout(async () => {
        const res = await UserService.getAll();
        expect(res.data).toEqual(users);

        done();
      });
    });
  });

  describe('#getOne', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const user = getOne();
      mock.onGet(`/users/${user.id}`).reply(200, user);

      setTimeout(async () => {
        const res = await UserService.getOne(user.id);
        expect(res.data).toEqual(user);

        done();
      });
    });
  });
});
