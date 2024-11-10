import { Component } from '@angular/core';
import { Employee } from '../../shared/model/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  employees: any[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com' },
  ];

  addEmployee() {
    // const newEmployee: Employee = {
    //   id: this.employees.length + 1,
    //   name: `New Employee ${this.employees.length + 1}`,
    //   email: `new${this.employees.length + 1}@example.com`,
    // };
    // this.employees.push(newEmployee);
  }

  editEmployee(employee: Employee) {
    // const updatedName = prompt('Edit Name:', employee.name);
    // if (updatedName) {
    //   employee.name = updatedName;
    // }
  }

  deleteEmployee(id: number) {
  //   this.employees = this.employees.filter((employee) => employee.id !== id);
  // }
}
}
