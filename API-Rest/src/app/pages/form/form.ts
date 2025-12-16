import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm: FormGroup
  private id: number

  servicioUsuario = inject(ServicioUsuario)
  activedRoute = inject(ActivatedRoute)
  router = inject(Router)

  constructor(){
    this.id = 0
    this.modelForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null,[Validators.required]),
      username: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required]),
      image: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

}
