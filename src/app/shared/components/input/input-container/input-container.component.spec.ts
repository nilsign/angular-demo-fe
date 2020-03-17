import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InputContainerComponent } from './input-container.component';
import {FieldLabelComponent} from 'shared/components/input/field-label/field-label.component';
import {FieldInfoComponent} from 'shared/components/input/field-info/field-info.component';

describe('InputContainerComponent', () => {

  let component: InputContainerComponent;
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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
