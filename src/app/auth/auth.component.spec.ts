import { NgForm } from '@angular/forms';
import { of } from 'rxjs';
import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let fixture: AuthComponent;
  let authServiceMock: any;
  let routerMock: any;

  let testForm = <NgForm>{
    value: {
      email: 'email',
      password: 'password',
    },
    valid: true,
    reset: () => { },
  };

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn((email: string, password: string) => {
        return of('test');
      }),
      signUp: jest.fn((email: string, password: string) => {
        return of('test');
      }),
    };
    routerMock = {
      navigate: jest.fn(),
    };

    fixture = new AuthComponent(authServiceMock, routerMock);
  });

  it('should switch from login to signup mode and vice versa', () => {
    fixture.onSwitchMode();
    expect(fixture.isLoginMode).toBeFalsy();
    fixture.onSwitchMode();
    expect(fixture.isLoginMode).toBeTruthy();
  });

  it('should call authService.signup with the right email and password', () => {
    fixture.isLoginMode = false;
    fixture.onSubmit(testForm);
    expect(authServiceMock.signUp).toHaveBeenCalledWith(
      testForm.value.email,
      testForm.value.password
    );
  });

  it('should call authService.login with the right email and password', () => {
    fixture.isLoginMode = true;
    fixture.onSubmit(testForm);
    expect(authServiceMock.login).toHaveBeenCalledWith(
      testForm.value.email,
      testForm.value.password
    );
  });
});
