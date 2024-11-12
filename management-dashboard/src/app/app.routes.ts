import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { AddEmployeeComponent } from './features/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './features/employees/edit-employee/edit-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    { path: 'employees', component : EmployeesComponent,
    children: [
        { path: 'add', component: AddEmployeeComponent },
        { path: 'list', component: EditEmployeeComponent },
      ]},
    { path: '**', component: NotFoundComponent },
  ];
