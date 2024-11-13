import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../model/employee.model';

@Pipe({
  name: 'searchEmployee',
  standalone: true, 
})
export class SearchEmployeePipe implements PipeTransform {
  transform(employees: Employee[], searchTerm: string): Employee[] {
    if (!employees || !searchTerm) {
      return employees; 
    }

    return employees.filter(employee =>
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  }