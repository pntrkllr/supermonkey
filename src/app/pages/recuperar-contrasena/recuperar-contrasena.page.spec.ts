import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperarContrasenaPage } from './recuperar-contrasena.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RecuperarContrasenaPage', () => {
  let component: RecuperarContrasenaPage;
  let fixture: ComponentFixture<RecuperarContrasenaPage>;

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarContrasenaPage],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
