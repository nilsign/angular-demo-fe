import { TestBed } from '@angular/core/testing';

import { AppInitializationService } from './app-initialization.service';

describe('AppInitializationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppInitializationService = TestBed.get(AppInitializationService);
    expect(service).toBeTruthy();
  });
});
