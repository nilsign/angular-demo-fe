import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputCheckboxComponent } from './input-checkbox.component';
import {FieldLabelComponent} from 'shared/components/input/field-label/field-label.component';

describe('InputCheckboxComponent', () => {

  let component: InputCheckboxComponent;
  let fixture: ComponentFixture<InputCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          InputCheckboxComponent,
          FieldLabelComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
