import { TestBed } from '@angular/core/testing';

import { BarTabService } from './bar-tab.service';

describe('BarTabService', () => {
  let service: BarTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
