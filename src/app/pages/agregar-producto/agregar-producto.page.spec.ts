import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarProductoPage } from './agregar-producto.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('AgregarProductoPage', () => {
  let component: AgregarProductoPage;
  let fixture: ComponentFixture<AgregarProductoPage>;

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProductoPage],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
