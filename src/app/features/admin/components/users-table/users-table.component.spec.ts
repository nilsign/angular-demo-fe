import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersTableComponent } from './users-table.component';
import {
  userJpaAdmin,
  userJpaAdminJpaSeller,
  userJpaBuyer,
  userJpaSeller,
  userSuperAdmin
} from 'testing/data/user-data.testing';
import { SharedModule } from 'shared/shared.module';
import { AdminModule } from 'features/admin/admin.module';

describe('UsersTableComponent', () => {

  const userDtos = [
    userSuperAdmin,
    userJpaAdmin,
    userJpaAdminJpaSeller,
    userJpaSeller,
    userJpaBuyer
  ];

  let testObj: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        AdminModule
      ],
      declarations: [
          UsersTableComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableComponent);
    testObj = fixture.componentInstance;

    testObj.userDtos = userDtos;

    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it ('should initialize all users on component initialization', async () => {
    expect(testObj.tableRowModel.length).toBe(5);
    expect(testObj.tableRowModel[0].roleNames).toEqual('GLOBALADMIN');
    expect(testObj.tableRowModel[1].roleNames).toEqual('ADMIN');
    expect(testObj.tableRowModel[2].roleNames).toEqual('ADMIN, SELLER');
    expect(testObj.tableRowModel[3].roleNames).toEqual('SELLER');
    expect(testObj.tableRowModel[4].roleNames).toEqual('BUYER');
  });
});
