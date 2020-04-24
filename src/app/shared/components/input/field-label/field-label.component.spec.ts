import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldLabelComponent } from './field-label.component';

describe('FieldLabelComponent', () => {

  let testObj: FieldLabelComponent;
  let fixture: ComponentFixture<FieldLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldLabelComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });
});
