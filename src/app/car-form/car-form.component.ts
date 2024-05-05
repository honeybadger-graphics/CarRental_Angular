import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CarDTO } from '../../../models';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './car-form.component.html',
  styleUrl: './car-form.component.css'
})
export class CarFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  carService = inject(CarService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  carForm = this.formBuilder.group<CarDTO>({
    id: 0,
    carId: "",
    carBrand: "",
    carName: "",
    carType: "",
    carPower: 0,
    carWeight: 0,
    carDeposit: 0,
    carDailyCost: 0,
  });

  isNewCar = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.isNewCar = false;
      this.carService.getOne(id).subscribe({
        next: (car) => this.carForm.setValue(car),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveCar() {
    const car = this.carForm.value as CarDTO;

    if (this.isNewCar) {
      this.carService.create(car).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/list-cars');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
    else {
      this.carService.update(car).subscribe({
        next: () => {
          // TODO: notification
          this.router.navigateByUrl('/list-cars');
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    
  }
}
