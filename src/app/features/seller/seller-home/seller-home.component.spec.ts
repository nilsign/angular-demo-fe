import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerHomeComponent } from './seller-home.component';

describe('SellerHomeComponent', () => {

  let fixture: ComponentFixture<SellerHomeComponent>;
  let testObj: SellerHomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SellerHomeComponent
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(SellerHomeComponent);
    testObj = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(testObj).toBeTruthy();
  });
});
