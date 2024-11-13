import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListEmployeeComponent } from "./list-employee/list-employee.component";
import { AddEditEmployeeComponent } from "./add-employee/add-edit-employee.component";
import { RouterEnum } from "../../shared/enum/route";

const routes: Routes = [
    { path: RouterEnum.LIST, component: ListEmployeeComponent }, // Default child route
    { path: RouterEnum.ADD, component: AddEditEmployeeComponent },
    { path: RouterEnum.EDIT, component: AddEditEmployeeComponent },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class EmployeeRoutingModule {}
  