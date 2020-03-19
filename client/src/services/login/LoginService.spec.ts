import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { getOne } from '../users/__mocks__/UserServiceStubs';
import LoginCredentials from '../../models/LoginCredentials';
import LoginService from './LoginService';
import { login } from './__mocks__/LoginServiceStubs';

let mock = null as any;

beforeEach(() => {
  mock = new MockAdapter(axios);
});

afterEach(() => {
  mock.restore();
});

describe('Login Service', () => {
  const password = 'some-password';

  describe('#login', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const user = getOne();
      const creds = new LoginCredentials();
      creds.email = user.email;
      creds.password = password;
      const jwt = login();

      mock.onPost('/login').reply(200, jwt);

      setTimeout(async () => {
        const res = await LoginService.login(creds);
        expect(res.data).toEqual(jwt);

        done();
      });
    });
  });

  describe('#refresh-token', () => {
    it('should invoke correct endpoint', (done: () => void) => {
      const jwt = login();

      mock.onPut('/refresh-token').reply(200, jwt);

      setTimeout(async () => {
        const res = await LoginService.refreshToken();
        expect(res.data).toEqual(jwt);

        done();
      });
    });
  });
});
