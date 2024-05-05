import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CompanyDTO, CompanyTransactionsDTO } from '../../../models';
import { CompanyService } from '../services/company.service';
import { TransactionService } from '../services/transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css'
})
export class PaymentFormComponent implements OnInit {

  router = inject(Router);
  formBuilder = inject(FormBuilder);

  companyService = inject(CompanyService);

  transactionService = inject(TransactionService);

  companies: CompanyDTO[] = [];

  transactionForm = this.formBuilder.group<CompanyTransactionsDTO>({
    id: 0,
    amount: 0,
    timestamp: '',
    reason:'',
    source: null,
  });

  ngOnInit(): void {
    this.companyService.getAll().subscribe(companies=> this.companies = companies);
  }

  createTransaction() {
    const transaction = this.transactionForm.value as CompanyTransactionsDTO;
    transaction.reason = "Deposit"
    this.transactionService.create(transaction).subscribe({
      next: () => {
       
        // TODO: notification
        this.router.navigateByUrl('/list-companies');
      },
      error: (err) => {
        console.error(err);
      }
      
    });

   
  }
}
