import { Component, inject } from '@angular/core';
import { ServicioUsuario } from '../../services/servicio-usuario';
import Swal from 'sweetalert2';
import { Card } from "../../components/card/card";
import { IApi } from '../../interfaces/iapi';
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
    try {
      const resp = await this.servicioUsuario.getAllUsers()
      this.user = resp.results
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }

    console.log(this.user)
  }

}
