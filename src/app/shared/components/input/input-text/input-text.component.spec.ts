import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputTextComponent } from './input-text.component';
import {FieldInfoComponent} from 'shared/components/input/field-info/field-info.component';
import {FieldLabelComponent} from 'shared/components/input/field-label/field-label.component';

describe('TextInputComponent', () => {

  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
          InputTextComponent,
          FieldLabelComponent,
          FieldInfoComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
