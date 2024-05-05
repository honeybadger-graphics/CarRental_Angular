import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CompanyDTO } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-compamy-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.css'
})
export class CompanyFormComponent implements OnInit {
  formBuilder = inject(FormBuilder);

  companyService = inject(CompanyService);

  router = inject(Router);

  activedRoute = inject(ActivatedRoute);

  companyForm = this.formBuilder.group<CompanyDTO>({
    id: 0,
    companyName: "",
    companyContactName: "",
    companyTaxNumber: 0,
    compRegNumber: 0,
    companyHQ: "",
    companyAccount: null,
  });
  
  isNewCompany = true;

  ngOnInit(): void {
    const id = this.activedRoute.snapshot.params['id'];

    if (id) {
      this.isNewCompany = false;
      this.companyService.getOne(id).subscribe({
        next: (company) => this.companyForm.setValue(company),
        error: (err) => {
          // TODO: notification
          console.error(err);
        }
      });
    }
  }

  saveCompany() {
    const company = this.companyForm.value as CompanyDTO;
    
    if (this.isNewCompany) {
      this.companyService.create(company).subscribe({
        next: () => {
         
          // TODO: notification
          this.router.navigateByUrl('/list-companies');
        },
        error: (err) => {
          console.error(err);
        }
        
      });
    }
    else {
      this.companyService.update(company).subscribe({
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
}
