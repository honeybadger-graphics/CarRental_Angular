import { Component, OnInit, inject } from '@angular/core';
import { CarService } from '../services/car.service';
import { CarDTO } from '../../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [],
  templateUrl: './car-list.component.html',
  styleUrl: './car-list.component.css'
})
export class CarListComponent implements OnInit {
  carService = inject(CarService);

  router = inject(Router);

  cars: CarDTO[] = [];

  ngOnInit(): void {
    this.carService.getAll().subscribe({
      next: cars => this.cars = cars,
      error: err => console.error(err)
    });
  }

  goToUserForm(id: number) {
    this.router.navigate([ '/edit-user', id ]);
  }

  deleteUser(car: CarDTO) {
    this.carService.delete(car.id).subscribe({
      next: () => {
        const index = this.cars.indexOf(car);
        if (index > -1) {
          this.cars.splice(index, 1);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      }
    });
  }
}
