import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('CambiarContrasenaPage', () => {
  let component: CambiarContrasenaPage;
  let fixture: ComponentFixture<CambiarContrasenaPage>;

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '123', // Devuelve un ID ficticio como ejemplo
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CambiarContrasenaPage],
      imports:[RouterTestingModule],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CambiarContrasenaPage);
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
