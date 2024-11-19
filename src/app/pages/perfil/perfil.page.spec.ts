import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';

import { RouterTestingModule } from '@angular/router/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';


describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  const appRoutes: Routes = [
    { path: 'descripcion', component: PerfilPage },
    // Otras rutas si es necesario
  ];

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    fetchUsuario: jasmine.createSpy('fetchUsuario').and.returnValue({ subscribe: jasmine.createSpy('subscribe') }),
    getUserPerfil: jasmine.createSpy('getUserPerfil').and.returnValue(Promise.resolve([])),
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports:[RouterTestingModule],
      providers:[
        { provide: ServicebdService, useValue : mockServicebdService },
        { provide: SQLite, useValue: mockSQLite}, // Proveer el mock de SQLite
        provideRouter(appRoutes,withComponentInputBinding())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
