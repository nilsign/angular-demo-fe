import { AppComponent } from 'app/app.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClient, HttpHandler} from '@angular/common/http';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let testObj: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    testObj = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
     expect(testObj).toBeTruthy();
  });

  it('should have as title \'angular-demo-fe\'', () => {
    expect(testObj.title).toEqual('angular-demo-fe');
  });

  it ('should redirect to role specific landing page', () => {
    const spy = spyOn(testObj.navigationHelper, 'navigateToRoleDependentLandingPage');

    testObj.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
