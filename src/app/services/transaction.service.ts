import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CompanyTransactionsDTO } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  http = inject(HttpClient);

  getAll() {
    return this.http.get<CompanyTransactionsDTO[]>('/api/transactions');
  }

  getOne(id: number) {
    return this.http.get<CompanyTransactionsDTO>('/api/transactions/' + id);    
  }

  create(transaction: CompanyTransactionsDTO) {
    return this.http.post<CompanyTransactionsDTO>('/api/transactions', transaction);
  }

  transactionsOfCompany(compayId: number) {
    return this.http.get<CompanyTransactionsDTO[]>('/api/transactions/created-by/' + compayId); 
  }
}