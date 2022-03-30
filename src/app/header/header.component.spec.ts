// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { User } from '../auth/user.model';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: HeaderComponent;
  let testUser: User;
  let authServiceMock: any;

  beforeAll(() => {
    testUser = new User('email', 'id', 'token', new Date());
    authServiceMock = {
      user: of(testUser),
      logout: jest.fn(),
    };
    fixture = new HeaderComponent(authServiceMock);
  });

  it('should set isAuthenticated to true when authService emits a valid user', () => {
    fixture.ngOnInit();
    expect(fixture.isAuthenticated).toBeTruthy();
  });

  it('should set isAuthenticated to false when authService emits a null/invalid user', () => {
    authServiceMock.user = of(null);
    fixture.ngOnInit();
    expect(fixture.isAuthenticated).toBeFalsy();
  });

  it('should call authService.logout when a user logs out', () => {
    fixture.ngOnInit();
    fixture.onLogout();
    expect(authServiceMock.logout).toHaveBeenCalledTimes(1);
  });
});
