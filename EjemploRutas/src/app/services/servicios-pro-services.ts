import { Injectable } from '@angular/core';
import { IServiciosProfesionales } from '../interface/iservicios-profesionales.interfaces';
import { SERVICIOSPROFESIONALES } from '../db/serviciosProfesionales.db';

@Injectable({
  providedIn: 'root',
})
export class ServiciosProServices {

  private arrServiciosProfesionales: IServiciosProfesionales[]
  private arrEmail: string []

  constructor(){
    this.arrServiciosProfesionales = SERVICIOSPROFESIONALES
    this.arrEmail = []
  }
  getAllSp(): IServiciosProfesionales[]{
    return this.arrServiciosProfesionales
  }

  registrarEmail(email:string){
    this.arrEmail.push(email)
  }

  getAllEmails(): string[]{
    return this.arrEmail
  }
}
