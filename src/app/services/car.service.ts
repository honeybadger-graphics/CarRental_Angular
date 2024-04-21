import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CarDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CarDTO[]>('/api/car');    
  }

  getOne(id: number) {
    return this.http.get<CarDTO>('/api/car/' + id);    
  }

  create(car: CarDTO) {
    return this.http.post<CarDTO>('/api/car', car);
  }

  update(car: CarDTO) {
    return this.http.put<CarDTO>('/api/car', car);
  }

  delete(id: number) {
    return this.http.delete('/api/car/' + id); 
  }
}