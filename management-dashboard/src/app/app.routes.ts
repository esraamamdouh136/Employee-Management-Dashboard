import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { RouterEnum } from './shared/enum/route';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
    { path: RouterEnum.DOSHBOARD, loadComponent: () => import('./features/dashboard/dashboard.component').then(c => c.DashboardComponent) },
    {
      path: RouterEnum.EMPLOYEES,
      loadChildren: () =>
        import('./features/employees/employees.routing').then((m) => m.EmployeeRoutingModule),
    },
      { path: '**', component: NotFoundComponent },
  ];
