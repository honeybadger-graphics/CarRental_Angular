import { Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarFormComponent } from './car-form/car-form.component';

export const routes: Routes = [
    {
        path: '',
        component: CarListComponent
    },
    {
        path: 'add-car',
        component: CarFormComponent
    },
    {
        path: 'edit-car/:id',
        component: CarFormComponent
    }
];
