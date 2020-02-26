import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveRoleSelectorComponent } from './active-role-selector.component';

describe('ActiveRoleSelectorComponent', () => {

  let component: ActiveRoleSelectorComponent;
  let fixture: ComponentFixture<ActiveRoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRoleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRoleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
