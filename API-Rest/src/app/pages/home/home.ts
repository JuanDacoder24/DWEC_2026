import { Component, inject } from '@angular/core';
import { IUsuario } from '../../interfaces/iusuario';
import { ServicioUsuario } from '../../services/servicio-usuario';
import Swal from 'sweetalert2';
import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  imports: [Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  arrUser: IUsuario[]
  servicioUsuario = inject(ServicioUsuario)

  constructor() {
    this.arrUser = []
  }

  async ngOnInit(): Promise<void> {
    try {
      this.arrUser = await this.servicioUsuario.getAllUsers()
    }
    catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al conectar con la API"
      });
    }
  }

}
