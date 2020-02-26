import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BuyerMenuBarItemsComponent } from './buyer-menu-bar-items.component';

describe('BuyerMenuBarItemsComponent', () => {

  let component: BuyerMenuBarItemsComponent;
  let fixture: ComponentFixture<BuyerMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyerMenuBarItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMenuBarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
