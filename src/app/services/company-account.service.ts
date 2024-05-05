import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyAccountDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountService {

  http = inject(HttpClient);
  getAll() {
    return this.http.get<CompanyAccountDTO>('/api/companyAccount');    
  }

  getOne(id: number) {
    return this.http.get<CompanyAccountDTO>('/api/companyAccount/' + id);    
  }

  create(account: CompanyAccountDTO) {
    return this.http.post<CompanyAccountDTO>('/api/companyAccount', account);
  }

  update(account: CompanyAccountDTO) {
    return this.http.put<CompanyAccountDTO>('/api/companyAccount', account);
  }

  delete(id: number) {
    return this.http.delete('/api/companyAccount/' + id); 
  }
}
