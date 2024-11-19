import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportesPage } from './reportes.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ReportesPage', () => {
  let component: ReportesPage;
  let fixture: ComponentFixture<ReportesPage>;

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    dbState: jasmine.createSpy('dbState').and.returnValue({ subscribe: jasmine.createSpy('subscribe') }),
    verUsuarios: jasmine.createSpy('verUsuarios').and.returnValue(Promise.resolve([])),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportesPage],
      providers: [
        { provide: ServicebdService, useValue : mockServicebdService},
        { provide: SQLite, useValue: mockSQLite}, // Proveer el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
