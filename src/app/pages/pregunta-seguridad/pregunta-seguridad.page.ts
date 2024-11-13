import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicebdService } from 'src/app/services/servicebd.service';

@Component({
  selector: 'app-pregunta-seguridad',
  templateUrl: './pregunta-seguridad.page.html',
  styleUrls: ['./pregunta-seguridad.page.scss'],
})
export class PreguntaSeguridadPage implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private bd: ServicebdService) { }

  ngOnInit() {
    this.form = this.fb.group({
      pregunta: ['', [Validators.required]],
      respuesta: ['', [Validators.required]],
    });
  }

  isRespuestaInvalid() {
    const control = this.form.get('respuesta');
    return control?.touched && control.invalid;
  }

  getRespuestaError() {
    const control = this.form.get('respuesta');
    if (control?.hasError('required')) {
      return 'La respuesta no puede estar vacía.';
    }
    return '';
  }

  getPreguntaRespuesta() {
    if (this.form.valid) {
      const { pregunta, respuesta } = this.form.value;
  
      this.bd.validarPregunta(pregunta, respuesta);
    }
  }

}
