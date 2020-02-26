import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SellerMenuBarItemsComponent } from './seller-menu-bar-items.component';

describe('SellerMenuBarItemsComponent', () => {

  let component: SellerMenuBarItemsComponent;
  let fixture: ComponentFixture<SellerMenuBarItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerMenuBarItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMenuBarItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
