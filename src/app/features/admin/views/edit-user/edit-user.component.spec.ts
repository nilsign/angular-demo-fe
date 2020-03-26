import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditUserComponent } from './edit-user.component';
import { SharedModule } from 'shared/shared.module';

describe('EditUserComponent', () => {

  let testObj: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule
      ],
      declarations: [ EditUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });
});
