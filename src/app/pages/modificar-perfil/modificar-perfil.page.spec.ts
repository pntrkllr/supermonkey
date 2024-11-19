import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilPage } from './modificar-perfil.page';

import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;

  const appRoutes: Routes = [
    { path: 'perfil', component: ModificarPerfilPage},
  ];

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    getUserPerfil: jasmine.createSpy('getUserPerfil').and.returnValue(Promise.resolve([])) // Simula el método getUserPerfil
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarPerfilPage],
      imports:[RouterTestingModule],
      providers:[
        { provide: ServicebdService, useValue: mockServicebdService},
        { provide: SQLite, useValue : mockSQLite}, // Usar el mock de SQLite
        provideRouter(appRoutes, withComponentInputBinding())
      ]
    }).compileComponents();
    

    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
