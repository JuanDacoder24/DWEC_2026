import { Component, inject, } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import Swal from 'sweetalert2';
import { Card } from "../../components/card/card";

import { IUsuario } from '../../interfaces/iusuario';

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  user: IUsuario[]
  servicioUsuario = inject(ServicioUsuario)

  constructor() {
    this.user = []
  }

  async ngOnInit(): Promise<void> {
    console.log('ngOnInit ejecutándose en Home'); 
    await this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    console.log('Cargando usuarios desde la API...'); 
    try {
      const resp = await this.servicioUsuario.getAllUsers()
      this.user = resp.results.map((u: IUsuario) => ({...u}))
      console.log('Usuarios cargados:', this.user)
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }
  }

  //funcion para eliminar usuario, usado en el componente hijo
  eliminarUsuario(userId: string) {
    this.user = this.user.filter(u => u._id !== userId);
  }

}
