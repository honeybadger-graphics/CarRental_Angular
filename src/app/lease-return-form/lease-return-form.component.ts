import { Component, NgModule, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaseService } from '../services/lease.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TransactionService } from '../services/transaction.service';
import { CompanyDTO, CompanyTransactionsDTO, ToolDTO } from '../../../models';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-lease-return-form',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, FormsModule],
  templateUrl: './lease-return-form.component.html',
  styleUrl: './lease-return-form.component.css',
})
export class LeaseReturnFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  leaseService = inject(LeaseService);
  toolService = inject(ToolService);
  transactionService = inject(TransactionService);
  router = inject(Router);
  activedRoute = inject(ActivatedRoute);
  isChecked: boolean = true;
  id: number = 0;
  transactionForm = this.formBuilder.group<CompanyTransactionsDTO>({
    id: 0,
    amount: 0,
    timestamp: new Date(),
    reason: '',
    source: null,
  });
  companyForm = this.formBuilder.group<CompanyDTO>({
    id: 0,
    companyName: '',
    companyContactName: '',
    companyTaxNumber: 0,
    compRegNumber: 0,
    companyHQ: '',
    companyAccount: null,
  });
  toolForm = this.formBuilder.group<ToolDTO>({
    id: 0,
    toolId: '',
    toolBrand: '',
    toolName: '',
    toolType: '',
    toolPower: 0,
    toolWeight: 0,
    toolDeposit: 0,
    toolDailyCost: 0,
    isToolAvailable: true,
  });
  ngOnInit(): void {
    this.id = this.activedRoute.snapshot.params['id'];
    this.leaseService.getOne(this.id).subscribe({
      next: (lease) => {
        if (lease.leasingCompany && lease.leasedTool) {
          this.companyForm.setValue(lease.leasingCompany);
          this.toolForm.setValue(lease.leasedTool);
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      },
    });
  }
  returnLease() {
    //TODO
    const date = new Date(Date.now());
    const dateToComperto = new Date(date.setHours(0, 0, 0));

    this.leaseService.getOne(this.id).subscribe({
      next: (lease) => {
        if (lease.leasingCompany && lease.leasedTool) {
          if (this.isChecked) {
            this.transactionForm.patchValue({
              amount: lease.leasedTool.toolDeposit,
            });
            this.transactionForm.patchValue({
              reason: lease.leasedTool.toolName + ' Visszatérítés',
            });
            this.transactionForm.patchValue({
              source: lease.leasingCompany,
            });
            // console.log(this.transactionForm.value);
            this.transactionService
              .create(this.transactionForm.value as CompanyTransactionsDTO)
              .subscribe();
          } //ischecked end
          var diff = Math.abs(
            new Date(dateToComperto).getTime() -
              new Date(lease.timestamp).getTime()
          );
          var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          // console.log(diffDays);
          this.transactionForm.patchValue({
            amount: -diffDays * lease.leasedTool.toolDailyCost,
          });
          this.transactionForm.patchValue({
            reason: lease.leasedTool.toolName + ' Napi Ár',
          });
          this.transactionForm.patchValue({
            source: lease.leasingCompany,
          });
          //console.log(this.transactionForm.value);
          this.transactionService
            .create(this.transactionForm.value as CompanyTransactionsDTO)
            .subscribe();
          this.toolService.getOne(lease.leasedTool.id).subscribe({
            next: (tool) => {
              tool.isToolAvailable = true;
              // console.log(tool);
              this.toolService.update(tool).subscribe();
            },
            error: (err) => {
              // TODO: notification
              console.error(err);
            },
          });
          this.leaseService.delete(this.id).subscribe({
            next: () => {
              // TODO: notification
              this.router.navigateByUrl('/active-leases');
            },
            error: (err) => {
              console.error(err);
            },
          });
        }
      },
      error: (err) => {
        // TODO: notification
        console.error(err);
      },
    });
  }
}
