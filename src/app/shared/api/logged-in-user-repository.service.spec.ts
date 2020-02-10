import { TestBed } from '@angular/core/testing';

import { LoggedInUserRepositoryService } from 'shared/api/logged-in-user-repository.service';

describe('LoggedInUserRepository.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggedInUserRepositoryService = TestBed.get(LoggedInUserRepositoryService);
    expect(service).toBeTruthy();
  });
});
