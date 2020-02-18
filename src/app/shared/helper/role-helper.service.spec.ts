import { TestBed } from '@angular/core/testing';

import { RoleHelperService } from './role-helper.service';

describe('RoleHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoleHelperService = TestBed.get(RoleHelperService);
    expect(service).toBeTruthy();
  });
});
