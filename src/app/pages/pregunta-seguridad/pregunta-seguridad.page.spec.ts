import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreguntaSeguridadPage } from './pregunta-seguridad.page';

describe('PreguntaSeguridadPage', () => {
  let component: PreguntaSeguridadPage;
  let fixture: ComponentFixture<PreguntaSeguridadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreguntaSeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
