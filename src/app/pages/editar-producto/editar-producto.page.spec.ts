import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarProductoPage } from './editar-producto.page';

describe('EditarProductoPage', () => {
  let component: EditarProductoPage;
  let fixture: ComponentFixture<EditarProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
