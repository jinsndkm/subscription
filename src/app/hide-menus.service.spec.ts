import { TestBed } from '@angular/core/testing';

import { HideMenusService } from './hide-menus.service';

describe('HideMenusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HideMenusService = TestBed.get(HideMenusService);
    expect(service).toBeTruthy();
  });
});
