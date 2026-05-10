import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NinjaServices } from '../../services/ninja-services';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {

  ninjaService = inject(NinjaServices);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  ninjaForm: FormGroup;
  isNew: boolean = true;
  currentNinjaId?: number;

  constructor() {
    this.ninjaForm = this.crateForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      if (id !== undefined) {
        this.isNew = false;
        this.currentNinjaId = Number(id);
        this.loadNinja(id);
      }
    })
  }

  async loadNinja(id: string) {
    try {
      const ninja = await this.ninjaService.getById(Number(id));
      if (ninja) {
        this.ninjaForm.patchValue({
          id: ninja.id,
          ninjaname: ninja.ninjaName,
          clan: ninja.clan,
          fullname: ninja.fullname,
          image1: ninja.image1 || '',
          image2: ninja.image2 || '',
          gender: ninja.gender,
          level: ninja.level,
          naturetype: ninja.naturetype,
          affiliation: ninja.affiliation,
          stats: {
            ninjutsu: ninja.stats?.ninjutsu ?? 0,
            taijutsu: ninja.stats?.taijutsu ?? 0,
            genjutsu: ninja.stats?.genjutsu ?? 0,
            intelligence: ninja.stats?.intelligence ?? 0,
            strength: ninja.stats?.strength ?? 0,
            speed: ninja.stats?.speed ?? 0,
            stamina: ninja.stats?.stamina ?? 0,
            handseals: ninja.stats?.handseals ?? 0,
            ninjaid: ninja.stats.ninjaid ?? 0
          }
        });
      } else {
        alert('No se encuentra el ninja');
        this.router.navigate(['/ninjas']);
      }
    } catch (error) {
      console.error('Error al cargar ninja:', error);
      alert('Error al cargar el ninja');
      this.router.navigate(['/ninjas']);
    }
  }
  private crateForm(): FormGroup {
    return new FormGroup({
      ninjaname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      clan: new FormControl('', [Validators.required, Validators.minLength(3)]),
      fullname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      image1: new FormControl(''),
      image2: new FormControl(''),
      gender: new FormControl('', [Validators.required, Validators.minLength(3)]),
      level: new FormControl('', [Validators.required, Validators.minLength(3)]),
      naturetype: new FormControl('', [Validators.required, Validators.minLength(3)]),
      affiliation: new FormControl('', [Validators.required, Validators.minLength(3)]),
      stats: new FormGroup({
        ninjutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        taijutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        genjutsu: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        intelligence: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        strength: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        speed: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        stamina: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
        handseals: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
      })
    })
  }

  async getDataForm() {

    if (this.ninjaForm.invalid) {
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    const ninjaData = this.ninjaForm.value;

    try {
      if (this.isNew) {
        await this.ninjaService.create(ninjaData);
        alert('Ninja creado exitosamente');
      } else {

        await this.ninjaService.update(ninjaData);
        alert('Ninja actualizado exitosamente');

      }

      this.ninjaForm.reset();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error guardando ninja:', error);
      alert('Error al guardar el ninja');
    }
  }
  onReset(): void {
    if (confirm('¿Estás seguro de que deseas resetear el formulario?')) {
      if (this.isNew) {
        this.ninjaForm.reset();
      } else {
        if (this.currentNinjaId) {
          this.loadNinja(this.currentNinjaId.toString());
        }
      }
    }
  }
}