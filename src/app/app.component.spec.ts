import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: AppComponent;
  let authServiceMock: any;

  beforeAll(() => {
    authServiceMock = {
      autoLogin: jest.fn(),
    };
    fixture = new AppComponent(authServiceMock);
  });

  it('should call auto login on init', () => {
    fixture.ngOnInit();
    expect(authServiceMock.autoLogin).toHaveBeenCalledTimes(1);
  });

  it('should clear user data on destroy', () => {
    localStorage.setItem('userData', 'test');
    fixture.ngOnDestroy();
    expect(localStorage.getItem('userData')).toBeNull();
  });
});
