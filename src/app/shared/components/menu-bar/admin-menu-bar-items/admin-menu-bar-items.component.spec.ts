import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminMenuBarItemsComponent } from './admin-menu-bar-items.component';

describe('AdminMenuBarItemsComponent', () => {

  let component: AdminMenuBarItemsComponent;
  let fixture: ComponentFixture<AdminMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMenuBarItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuBarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
