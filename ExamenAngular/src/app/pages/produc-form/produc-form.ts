import { IProducts } from './../../interface/iproducts';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../service/product-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-produc-form',
  imports: [ReactiveFormsModule],
  templateUrl: './produc-form.html',
  styleUrl: './produc-form.css',
})
export class ProducForm {

  modelForm: FormGroup
  private id: number = 0

  ProductService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

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

  getDataForm(){
    let product = this.modelForm.value as IProducts;
    product.id = this.ProductService.getLenght()+1;
    product.active = true;
    this.ProductService.insertProduct(product);
    this.router.navigate(['product-list'])
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined{
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

  ngOnInit(): void{
    this.activatedRoute.params.subscribe((params: any) =>{
      let id: string = params.id
      if(id != undefined){
        let product = this.ProductService.getProductById(id)
        if(product != undefined){
          this.isNew = false
          //  patchValue reemplaza cualquier propiedad definida en el objeto que haya cambiado en el modelo de formulario
          this.modelForm.patchValue({
            name: product.name ?? null,
            description: product.description ?? null,
            price: product.price ?? null,
            category: product.category ?? null,
            image: product.image ?? null,
          })
        }
      }
    })
  }



}
