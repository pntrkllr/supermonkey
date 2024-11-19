import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaSeguridadPage } from './pregunta-seguridad.page';
import { ServicebdService } from 'src/app/services/servicebd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('PreguntaSeguridadPage', () => {
  let component: PreguntaSeguridadPage;
  let fixture: ComponentFixture<PreguntaSeguridadPage>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreguntaSeguridadPage],
      providers: [
        ServicebdService,
        { provide: SQLite},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
