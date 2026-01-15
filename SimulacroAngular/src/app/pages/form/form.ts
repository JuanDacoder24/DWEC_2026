import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductServices } from '../../services/product-services';

@Component({
  selector: 'app-form',
  imports: [RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm: FormGroup
  productServices = inject(ProductServices)
  activedRoute = inject(ActivatedRoute)
  route = inject(Router)
  isNew: boolean

  constructor(){
    this.isNew = true
    this.modelForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(300)]),
      price: new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1000)]),
      category: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    })

    
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

  getDataForm() {

  }

}
