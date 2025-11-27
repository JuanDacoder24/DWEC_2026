import { IProductos } from './../../interfaces/iproductos';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm: FormGroup
  private sku: number = 0;

  constructor(){
    this.modelForm = new FormGroup({
      // sku: new FormGroup (-1,),
      // title: new FormGroup (null,[Validators.required]),
      // description: new FormGroup (null,[Validators.required]),
      // price: new FormGroup (null, [Validators.required]),
      // url: new FormGroup (null, [Validators.required])
    },[])
  }

  getDataForm() {

    
  }

}
