import { IProductos } from './../../interfaces/iproductos';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceProducts } from '../../service/service-products';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrls: ['./form.css'],
})
export class Form {

  modelForm: FormGroup
  private id: number = 0

  serviceProducts = inject(ServiceProducts)
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  isNew: boolean


  constructor() {
    this.isNew = true
    this.modelForm = new FormGroup({
      id: new FormControl(null, []),
      sku: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.required])
    }, [])
  }

  getDataForm() {
    let product = this.modelForm.value as IProductos
    if (this.isNew) {
      product.id = -1
      this.serviceProducts.addProduct(product)
    }
    this.modelForm.reset()
    this.router.navigate(['home'])
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let sku: string = params.sku
      if (sku != undefined) {
        let product = this.serviceProducts.getProductBySku(sku)
        if (product != undefined) {
          this.isNew = false
          this.modelForm = new FormGroup({
            id: new FormControl(null, []),
            sku: new FormControl(null, [Validators.required]),
            title: new FormControl(null, [Validators.required]),
            description: new FormControl(null, [Validators.required]),
            price: new FormControl(null, [Validators.required]),
            url: new FormControl(null, [Validators.required])
          }, [])
        }
      }
    })
  }


}
