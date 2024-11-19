import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPage } from './register.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  // Crear un mock básico de SQLite
  const mockSQLite = jasmine.createSpyObj('SQLite', {
    create: Promise.resolve({
      executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve({ rows: [] })),
    }),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterPage],
      providers: [
        ServicebdService,
        { provide: SQLite, useValue: mockSQLite }, // Proveer el mock de SQLite
      ],
    }).compileComponents();
    
    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
