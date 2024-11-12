import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { EditEmployeeComponent } from "./edit-employee/edit-employee.component";

const routes: Routes = [
    { path: 'list', component: ListEmployeeComponent }, // Default child route
    { path: 'add', component: AddEmployeeComponent },
    { path: 'edit', component: EditEmployeeComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EmployeeRoutingModule {}
  