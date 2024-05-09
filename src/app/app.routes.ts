import { Routes } from '@angular/router';
import { ToolListComponent } from './tool-list/tool-list.component';
import { ToolFormComponent } from './tool-form/tool-form.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';
import { PaymentFormComponent } from './payment-form/payment-form.component';

export const routes: Routes = [
    {
        path: 'list-tools',
        component: ToolListComponent
    },
    {
        path: 'add-tool',
        component: ToolFormComponent
    },
    {
        path: 'edit-tool/:id',
        component: ToolFormComponent
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
