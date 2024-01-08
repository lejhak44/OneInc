import { TestBed } from '@angular/core/testing';

import { StringCipherService } from './string-cipher.service';

describe('StringCipherService', () => {
  let service: StringCipherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCipherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
