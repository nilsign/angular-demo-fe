import { SimpleChange} from '@angular/core';
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
import { UsersTableRowModel } from 'features/admin/components/users-table/users-table-row.model';

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
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(testObj).toBeTruthy();
  });

  it ('should initialize all users on component initialization', async () => {
    testObj.ngOnChanges({
      userDtos: new SimpleChange(null, userDtos, true)
    });

    expect(testObj.tableRowModel[0].roleNames).toEqual('GLOBALADMIN');
    expect(testObj.tableRowModel[1].roleNames).toEqual('ADMIN');
    expect(testObj.tableRowModel[2].roleNames).toEqual('ADMIN, SELLER');
    expect(testObj.tableRowModel[3].roleNames).toEqual('SELLER');
    expect(testObj.tableRowModel[4].roleNames).toEqual('BUYER');
    expect(testObj.tableRowModel.length).toBe(5);
  });

  it ('should return emit event on table row clicked', async () => {
    const rowModel: UsersTableRowModel = {
      userDto: userJpaAdminJpaSeller,
      name: '',
      email: '',
      roleNames: ''
    };
    const spy = spyOn(testObj.tableRowClickedEvent, 'emit');

    testObj.onTableRowClicked(rowModel);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(userJpaAdminJpaSeller);
  });

  it ('should return false when show column gets an unknown column name', async () => {
    expect(testObj.showColumn('unknown-column-name')).toBeFalsy();
  });
});
