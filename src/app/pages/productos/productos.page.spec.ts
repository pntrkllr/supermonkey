import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosPage } from './productos.page';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter, Routes, withComponentInputBinding } from '@angular/router';
import { of } from 'rxjs';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ProductosPage', () => {
  let component: ProductosPage;
  let fixture: ComponentFixture<ProductosPage>;

  const appRoutes: Routes = [
    { path: 'descripcion', component: ProductosPage },
    // Otras rutas si es necesario
  ];

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    dbState: jasmine.createSpy('dbState').and.returnValue({ subscribe: jasmine.createSpy('subscribe') }),
    getProductos: jasmine.createSpy('getProductos').and.returnValue(Promise.resolve([])),
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ProductosPage],
      imports:[HttpClientModule],
      providers:[
        { provide: ServicebdService, useValue : mockServicebdService },
        { provide: SQLite, useValue : mockSQLite}, // Proveer el mock de SQLite
        provideRouter(appRoutes,withComponentInputBinding())
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
