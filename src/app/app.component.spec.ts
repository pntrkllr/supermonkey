import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ServicebdService } from './services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AppComponent', () => {

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
