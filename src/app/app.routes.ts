import { Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

export const routes: Routes = [
    {
        path: 'list-cars',
        component: CarListComponent
    },
    {
        path: 'add-car',
        component: CarFormComponent
    },
    {
        path: 'edit-car/:id',
        component: CarFormComponent
    },
    {
        path: 'list-companies',
        component: CompanyListComponent
    },
    {
        path: 'add-company',
        component: CompanyFormComponent
    },
    {
        path: 'edit-company/:id',
        component: CompanyFormComponent
    },
    {
        path: 'make-payment',
        component: PaymentFormComponent
    }
];
