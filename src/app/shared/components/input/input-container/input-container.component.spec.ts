import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputContainerComponent } from './input-container.component';
import { FieldLabelComponent } from 'shared/components/input/field-label/field-label.component';

describe('InputContainerComponent', () => {

  let testObj: InputContainerComponent;
  let fixture: ComponentFixture<InputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          InputContainerComponent,
          FieldLabelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputContainerComponent);
    testObj = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });
});
