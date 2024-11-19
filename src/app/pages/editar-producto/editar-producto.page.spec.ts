import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProductoPage } from './editar-producto.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';


describe('EditarProductoPage', () => {
  let component: EditarProductoPage;
  let fixture: ComponentFixture<EditarProductoPage>;

  const appRoutes: Routes = [
    { path: 'descripcion', component: EditarProductoPage },
    // Otras rutas si es necesario
  ];

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    editarProducto: jasmine.createSpy('editarProducto').and.returnValue(Promise.resolve([])) // Simula el método getUserPerfil
  };

  beforeEach( async () => {

    await TestBed.configureTestingModule({
      declarations: [EditarProductoPage],
      providers:[
        { provide: ServicebdService, useValue : mockServicebdService },
        { provide: SQLite, useValue : mockSQLite}, // Proveer el mock de SQLite
        provideRouter(appRoutes,withComponentInputBinding())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarProductoPage);
    component = fixture.componentInstance;
    
    component.productoM = {
      id_producto: 5,
      nombre_pr: 'Producto de prueba',
      cantidad_kg : 3,
      precio: 100,
      stock : 10,
      estatus: 2,
      id_categoria: 2,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
