import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeroServices } from '../../services/hero-services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ICharacter } from '../../interfaces/icharacter';

@Component({
  selector: 'app-hero-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.css',
})
export class HeroForm {

  modelForm!: FormGroup
  heroServices = inject(HeroServices)
  activedRoute = inject(ActivatedRoute)
  route = inject(Router)
  isNew: boolean = true

  constructor() {
    this.modelForm = new FormGroup({
      heroname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image1: new FormControl('', [Validators.required]),
      image2: new FormControl('', [Validators.required]),
      image3: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required, Validators.minLength(3)]),
      race: new FormControl('', [Validators.required, Validators.minLength(3)]),
      alignment: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

    let hero = this.modelForm.value as ICharacter;

    try {
      if (this.isNew) {
        const res = await this.heroServices.insertHero(hero)
        if (res) {
          this.modelForm.reset();

          await Swal.fire({
            title: "Heroe agregado con éxito!",
            icon: "success",
            draggable: true
          });

          this.route.navigate(['/dashboard/heroList'],);
        }
      } else {
        const res = await this.heroServices.updateHero(hero)
        if (res) {
          this.modelForm.reset();

          await Swal.fire({
            title: "El Heroe se actualizó con éxito!",
            icon: "success",
            draggable: true
          });

          this.route.navigate(['/dashboard/heroList'],

          );
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: "Error",
        text: "No se pudo guardar el heroe",
        icon: "error",
        draggable: true
      });
    }
  }

  ngOnInit(): void {
    this.activedRoute.params.subscribe(async (params: any) => {
      let id: string = params.id;
      if (id) {
        let miHero = await this.heroServices.getHeroById(id);
        if (miHero) {
          this.isNew = false;
          this.modelForm.patchValue({
            heroname: miHero.heroname,
            fullname: miHero.fullname,
            image1: miHero.image1,
            image2: miHero.image2,
            image3: miHero.image3,
            gender: miHero.gender,
            race: miHero.race,
            alignment: miHero.alignment
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se encuentra el Heroe",
            icon: "error"
          });
          this.route.navigate(['/dashboard/heroList']);
        }
      }
    });
  }

}
