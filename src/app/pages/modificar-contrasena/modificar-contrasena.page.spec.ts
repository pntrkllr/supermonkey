import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarContrasenaPage } from './modificar-contrasena.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ModificarContrasenaPage', () => {
  let component: ModificarContrasenaPage;
  let fixture: ComponentFixture<ModificarContrasenaPage>;

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarContrasenaPage],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('validar contrasena con simbolos, numeros y letras', () => {
    
    component.nuevaContrasena = '@@@@123a';
    component.confirmarContrasena = '@@@@123a';
  
    expect(component.patternContrasena()).toBeTrue(); // Debe contener símbolos
    expect(component.numerosContrasena()).toBeTrue(); // Debe contener números
    expect(component.letrasContrasena()).toBeTrue();  // Debe contener letras
  
    
    expect(component.nuevaContrasena === component.confirmarContrasena).toBeTrue();
  });
});
