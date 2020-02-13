import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHomeComponent } from './admin-home.component';

describe('AdminHomeComponent', () => {

  let fixture: ComponentFixture<AdminHomeComponent>;
  let testObj: AdminHomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
       AdminHomeComponent
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AdminHomeComponent);
    testObj = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(testObj).toBeTruthy();
  });
});
