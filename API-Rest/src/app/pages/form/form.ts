import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm: FormGroup
  servicioUsuario = inject(ServicioUsuario)
  activedRoute = inject(ActivatedRoute)
  router = inject(Router)

  isNew: boolean

  constructor() {
    this.isNew = true
    this.modelForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    })
  }

  async getDataForm() {
    let user = this.modelForm.value as IUsuario
    if (this.isNew) {
      const res = await this.servicioUsuario.addUser(user)
      if (res.id) {
        Swal.fire({
          title: "El usuario se ha insertado correctamente",
          icon: "success",
          draggable: true
        });
      }
    }else{
      const res = await this.servicioUsuario.updateUser(user)
      if(res.id){
        Swal.fire({
          title: "El usuario se ha actualizado correctamente",
          icon: "success",
          draggable: true
        });
      }
    }
    this.modelForm.reset()
    this.router.navigate(['home'])
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

}
