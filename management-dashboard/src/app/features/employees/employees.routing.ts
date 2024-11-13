import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { AddEditEmployeeComponent } from "./add-employee/add-edit-employee.component";

const routes: Routes = [
    { path: 'list', component: ListEmployeeComponent }, // Default child route
    { path: 'add', component: AddEditEmployeeComponent },
    { path: 'edit/:id', component: AddEditEmployeeComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EmployeeRoutingModule {}
  