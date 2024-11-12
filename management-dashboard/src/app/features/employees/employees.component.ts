import { Component, inject } from '@angular/core';
import { Employee } from '../../shared/model/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NamefilterPipe } from '../../shared/components/pipe/filter.pipe';
import { EmployeeService } from '../../core/services/employee.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, NamefilterPipe, RouterModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  private employeeService = inject(EmployeeService);
  inputVal: string = '';
  employees: Employee[] = [];

  ngOnInit() {
    this.getEmployeesList();
  }
  getEmployeesList() {
    this.employeeService.getEmployees().subscribe((res) => {
      this.employees = res;
    });
  }
}
