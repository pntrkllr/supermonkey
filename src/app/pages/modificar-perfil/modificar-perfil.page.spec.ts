import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarPerfilPage } from './modificar-perfil.page';

describe('ModificarPerfilPage', () => {
  let component: ModificarPerfilPage;
  let fixture: ComponentFixture<ModificarPerfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
