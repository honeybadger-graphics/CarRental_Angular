import { Injectable, inject } from '@angular/core';
import { LeaseDTO } from '../../../models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LeaseService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<LeaseDTO[]>('/api/lease');
  }

  getOne(id: number) {
    return this.http.get<LeaseDTO>('/api/lease/' + id);
  }

  create(lease: LeaseDTO) {
    return this.http.post<LeaseDTO>('/api/lease', lease);
  }

  update(lease: LeaseDTO) {
    return this.http.put<LeaseDTO>('/api/lease', lease);
  }

  delete(id: number) {
    return this.http.delete('/api/lease/' + id);
  }
}
