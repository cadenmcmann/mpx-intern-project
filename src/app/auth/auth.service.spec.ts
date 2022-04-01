import { AuthService } from './auth.service';
import { User } from './user.model';

describe('AuthService', () => {
  let fixture: AuthService;
  let httpMock: any;
  let routerMock: any;
  const signUpUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXT-2pUNxSUyRZW31VVBkLybVgGIeCpMc';

  const loginUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXT-2pUNxSUyRZW31VVBkLybVgGIeCpMc';

  const httpUserParams = {
    email: 'email',
    password: 'password',
    returnSecureToken: true,
  };

  beforeEach(() => {
    httpMock = {
      post: jest.fn((url: string) => ({
        pipe: jest.fn(),
      })),
    };
    routerMock = {
      navigate: jest.fn(),
    };
    fixture = new AuthService(httpMock, routerMock);
  });

  it('should call http.post on user signup correct url', () => {
    fixture.signUp('email', 'password');
    expect(httpMock.post).toHaveBeenCalledWith(signUpUrl, httpUserParams);

    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  it('should call http.post on user login correct url', () => {
    fixture.login('email', 'password');
    expect(httpMock.post).toHaveBeenCalledWith(loginUrl, httpUserParams);

    expect(httpMock.post).toHaveBeenCalledTimes(1);
  });

  it('should emit a null user and clear local storage data on logout', () => {
    fixture.logout();
    expect(localStorage.getItem('userData')).toBeNull();
    expect(localStorage.getItem('cartData')).toBeNull();
    expect(localStorage.getItem('shoppingData')).toBeNull();
    fixture.user.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should auto login a user that has a valid token', () => {
    let testUser = new User('test', 'id', 'token', new Date());
    localStorage.setItem('userData', JSON.stringify(testUser));
    fixture.autoLogin();
    fixture.user.subscribe((user) => {
      expect(user).toEqual(testUser);
    });
  });
});
