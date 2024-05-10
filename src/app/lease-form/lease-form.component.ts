import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../services/company.service';
import { ToolService } from '../services/tool.service';
import { TransactionService } from '../services/transaction.service';
import { LeaseService } from '../services/lease.service';
import {
  CompanyDTO,
  CompanyTransactionsDTO,
  LeaseDTO,
  ToolDTO,
} from '../../../models';
import { CompanyAccountService } from '../services/company-account.service';
import e from 'express';

@Component({
  selector: 'app-lease-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './lease-form.component.html',
  styleUrl: './lease-form.component.css',
})
export class LeaseFormComponent {
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  companyService = inject(CompanyService);
  toolService = inject(ToolService);
  leaseService = inject(LeaseService);
  transactionService = inject(TransactionService);
  accountService = inject(CompanyAccountService);
  companies: CompanyDTO[] = [];
  tools: ToolDTO[] = [];
  buttonDisabled = false;
  leaseForm = this.formBuilder.group<LeaseDTO>({
    id: 0,
    timestamp: new Date(),
    leasedTool: null,
    leasingCompany: null,
  });
  transactionForm = this.formBuilder.group<CompanyTransactionsDTO>({
    id: 0,
    amount: 0,
    timestamp: new Date(),
    reason: '',
    source: null,
  });

  ngOnInit(): void {
    this.companyService
      .getAll()
      .subscribe((companies) => (this.companies = companies));
    this.toolService.getAll().subscribe((tools) => (this.tools = tools));
    this.leaseForm.valueChanges.subscribe((value) => {
      if (value.leasingCompany) {
        this.accountService.getOne(value.leasingCompany.id).subscribe({
          next: (account) => {
            if (account.companyBalance < -50000) {
              this.buttonDisabled = true;
            } else {
              this.buttonDisabled = false;
            }
          },
        });
      }
    });
  }

  createLease() {
    const lease = this.leaseForm.value as LeaseDTO;
    lease.timestamp = new Date(Date.now());
    lease.timestamp = new Date(lease.timestamp.setHours(0, 0, 0));

    if (
      this.leaseForm.value.leasedTool &&
      this.leaseForm.value.leasingCompany
    ) {
      this.toolService.getOne(this.leaseForm.value.leasedTool.id).subscribe({
        next: (tool) => {
          this.transactionForm.patchValue({ amount: -tool.toolDeposit });
          this.transactionForm.patchValue({ reason: tool.toolName + ' Letét' });
          this.transactionForm.patchValue({
            source: this.leaseForm.value.leasingCompany,
          });
          this.transactionService
            .create(this.transactionForm.value as CompanyTransactionsDTO)
            .subscribe();
          tool.isToolAvailable = false; //works
          this.toolService.update(tool).subscribe(); //works
          console.log(this.transactionForm.value as CompanyTransactionsDTO);
        },
        error: (err) => {
          // TODO: notification
          console.error(err);
        },
      });
    }
    this.leaseService.create(lease).subscribe({
      //works
      next: () => {
        // TODO: notification
        this.router.navigateByUrl('/active-leases');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
