import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioUsuario } from '../../services/servicio-usuario';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IUsuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm: FormGroup
  servicioUsuario = inject(ServicioUsuario)
  activedRoute = inject(ActivatedRoute)
  router = inject(Router)

  isNew: boolean
  userId: string | null = null 

  constructor() {
    this.isNew = true
    this.modelForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    }, [])
  }

  async getDataForm() {
  console.log('form valido', this.modelForm.valid);
  console.log('valores', this.modelForm.value);

  let user = this.modelForm.value as IUsuario

  if (this.isNew) {
    console.log('entrando en modo CREAR');
    const res = await this.servicioUsuario.addUser(user)
    console.log('respuesta crear:', res);
    if (res.id) {
      await Swal.fire({
        title: "El usuario se ha insertado correctamente",
        icon: "success",
        draggable: true
      });
    }

  } else {
    user._id = this.userId!;
    const res = await this.servicioUsuario.updateUser(user);
    console.log('respuesta de la API:', res)
    if (res.id) {
      await Swal.fire({
        title: "El usuario se ha actualizado correctamente",
        icon: "success",
        draggable: true
      });
    } else {
    }
  }

  this.modelForm.reset()
  this.router.navigate(['/home'])
}

  async ngOnInit() {
    this.activedRoute.params.subscribe(async (params: any) => {
      let _id: string = params._id
      if (_id != undefined) {
        this.isNew = false
        this.userId = _id  
        try {
          let user = await this.servicioUsuario.getUserById(_id)
          if (user != undefined) {
            this.modelForm.patchValue({
              first_name: user.first_name,
              last_name: user.last_name,
              username: user.username,
              email: user.email,
              image: user.image,
              password: user.password || ''
            })
          } else {
            Swal.fire({
              title: "Error",
              text: "No se pudo encontrar el usuario",
              icon: "error"
            });
            this.router.navigate(['/home']);
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo cargar el usuario",
            icon: "error"
          });
          this.router.navigate(['/home']);
        }
      } else {
        this.isNew = true
        this.userId = null
      }
    })
  }



  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

}