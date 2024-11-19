import { TestBed } from '@angular/core/testing';

import { ServicebdService } from './servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ServicebdService', () => {
  let database: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      ServicebdService,
      { provide: SQLite }
      ]
    });
    database = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(database).toBeTruthy();
  });
});
