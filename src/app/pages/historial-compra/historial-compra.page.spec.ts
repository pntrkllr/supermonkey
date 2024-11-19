import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialCompraPage } from './historial-compra.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { CarritoPage } from '../carrito/carrito.page';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HistorialCompraPage', () => {
  let component: HistorialCompraPage;
  let fixture: ComponentFixture<HistorialCompraPage>;

  class BdserviceServiceMock {
    getUserPerfil() {
      return of([{ id_usuario: 1 }]);
    }
    fetchUsuario() {
      return of([ 
        { id_usuario: 1, nombre: 'Compra 1' }
      ]);
    }
  }

  const appRoutes: Routes = [
    { path: 'carrito', component: CarritoPage },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HistorialCompraPage],
      imports: [RouterTestingModule],
      providers: [
        { provide: ServicebdService, useClass : BdserviceServiceMock },
        { provide: SQLite },
        provideRouter(appRoutes, withComponentInputBinding()),
        
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(HistorialCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
