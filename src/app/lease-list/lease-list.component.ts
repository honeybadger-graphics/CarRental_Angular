import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { LeaseService } from '../services/lease.service';
import { LeaseDTO } from '../../../models';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lease-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './lease-list.component.html',
  styleUrl: './lease-list.component.css',
})
export class LeaseListComponent implements OnInit {
  leaseService = inject(LeaseService);

  router = inject(Router);

  leases: LeaseDTO[] = [];

  ngOnInit(): void {
    this.leaseService.getAll().subscribe({
      next: (companies) => (this.leases = companies),
      error: (err) => console.error(err),
    });
  }

  goToReturnForm(id: number) {
    this.router.navigate(['/return-form', id]);
  }
}
