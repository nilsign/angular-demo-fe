import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldInfoComponent } from './field-info.component';

describe('FieldInfoComponent', () => {

  let testObj: FieldInfoComponent;
  let fixture: ComponentFixture<FieldInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldInfoComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it('should call error info function on errors', async () => {
    spyOn(testObj, 'hasErrorInfo').and.stub().and.returnValue(true);
    const spy = spyOn(testObj, 'getErrorInfo');

    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
});
