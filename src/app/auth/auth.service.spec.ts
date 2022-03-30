import { AuthService } from './auth.service';

describe('AuthService', () => {
  let fixture: AuthService;
  let httpMock: any;
  let routerMock: any;
  let userServiceMock: any;
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
    userServiceMock = {
      postUserData: jest.fn(),
    };
    routerMock = {
      navigate: jest.fn(),
    };
    fixture = new AuthService(httpMock, routerMock, userServiceMock);
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
});
