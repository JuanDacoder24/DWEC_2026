import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ProductServices } from '../../services/product-services';
import { IProduct } from '../../interfaces/iproduct';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  modelForm!: FormGroup  
  productServices = inject(ProductServices)
  activedRoute = inject(ActivatedRoute)
  route = inject(Router)
  isNew: boolean = true  

  constructor() {
    this.modelForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),  // ← Cambia null por ''
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
      price: new FormControl('', [Validators.required, Validators.min(0), Validators.max(1000)]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    })
  }

  checkControl(FormControlName: string, validator: string): boolean | undefined {
    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched;
  }

  async getDataForm() {
  if (this.modelForm.invalid) {
    Object.keys(this.modelForm.controls).forEach(key => {
      this.modelForm.get(key)?.markAsTouched();
    });
    return;
  }

  let product = this.modelForm.value as IProduct;
  
  try {
    if (this.isNew) {
      const res = await this.productServices.insertProduct(product);
      if (res) {
        this.modelForm.reset();
        
        await Swal.fire({
          title: "Producto agregado con éxito!",
          icon: "success",
          draggable: true
        });
        
        this.route.navigate(['/dashboard/productList'], );
      }
    } else {
      const res = await this.productServices.updateProduct(product);
      if (res) {
        this.modelForm.reset();
        
        await Swal.fire({
          title: "El producto se actualizó con éxito!",
          icon: "success",
          draggable: true
        });
        
        this.route.navigate(['/dashboard/productList'],

        );
      }
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      title: "Error",
      text: "No se pudo guardar el producto",
      icon: "error",
      draggable: true
    });
  }
}

  ngOnInit(): void {
    this.activedRoute.params.subscribe(async (params: any) => {
      let _id: string = params._id;
      if (_id) {
        let miProduct = await this.productServices.getProductById(_id);
        if (miProduct) {
          this.isNew = false;
          this.modelForm.patchValue({
            name: miProduct.name,
            description: miProduct.description,
            price: miProduct.price,
            category: miProduct.category,
            image: miProduct.image
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se encuentra el producto",
            icon: "error"
          });
          this.route.navigate(['/dashboard/productList']);
        }
      }
    });
  }
}