import { Component, inject } from '@angular/core';
import { Employee } from '../../../shared/model/employee.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NamefilterPipe } from '../../../shared/components/pipe/filter.pipe';
import { EmployeeService } from '../../../core/services/employee.service';
@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, NamefilterPipe, RouterModule],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent {
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
  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.employees = this.employees.filter((e) => e.id !== id);
    });
  }
}
