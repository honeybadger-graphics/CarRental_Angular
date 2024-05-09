import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ToolDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<ToolDTO[]>('/api/tool');    
  }

  getOne(id: number) {
    return this.http.get<ToolDTO>('/api/tool/' + id);    
  }

  create(tool: ToolDTO) {
    return this.http.post<ToolDTO>('/api/tool', tool);
  }

  update(car: ToolDTO) {
    return this.http.put<ToolDTO>('/api/tool', car);
  }

  delete(id: number) {
    return this.http.delete('/api/tool/' + id); 
  }
}