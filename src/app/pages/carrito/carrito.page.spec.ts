import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';

import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { of } from 'rxjs';

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  const mockSQLite = {
    executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve())
  };

  const mockServicebdService = {
    dbState: jasmine.createSpy('dbState').and.returnValue({ subscribe: jasmine.createSpy('subscribe') }),
    verCarrito: jasmine.createSpy('verCarrito').and.returnValue(of([])),
    fetchTotal: jasmine.createSpy('fetchTotal').and.returnValue(of([])),
    getTotal: jasmine.createSpy('getTotal').and.returnValue(of([])),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage],
      providers: [
        { provide: SQLite, useValue: mockSQLite },
        { provide: ServicebdService, useValue: mockServicebdService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
