import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    {
      path: 'employees',
      loadChildren: () =>
        import('./features/employees/employees.routing').then((m) => m.EmployeeRoutingModule),
    },
      { path: '**', component: NotFoundComponent },
  ];
