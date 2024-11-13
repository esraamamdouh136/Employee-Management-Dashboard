import { Component, inject } from '@angular/core';
import { Employee } from '../../../shared/model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../../../shared/components/employee-form/employee-form.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent, ErrorMessageComponent],
  templateUrl: './add-edit-employee.component.html',
})
export class AddEditEmployeeComponent {
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee: Employee | null = null;
  errorMessage: string;

  formTitle = 'Add New Employee';
  submitButtonLabel = 'Add Employee';
  employeeId : number;
  ngOnInit() {
    this.checkheaderTitle();
  }

  checkheaderTitle() {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          this.employee = employee;
          this.formTitle = 'Edit Employee';
          this.submitButtonLabel = 'Update Employee';
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to load employee data';
        },
      });
    }
  }

  handleFormSubmit(employeeData: Employee) {
    if (this.employee?.id) {
      const updatedEmployee = { ...employeeData};
      console.log(updatedEmployee)
      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          this.navigation();
        },
        error: (error) => {
          this.errorMasseage(error);
        },
      });
    } else {
      this.employeeService.addEmployee(employeeData).subscribe({
        next: () => {
          this.navigation();
        },
        error: (error) => {
          this.errorMasseage(error);
        },
      });
    }
  }
  navigation() {
    this.router.navigate(['/employees/list']);
  }
  errorMasseage(error: { message: string }) {
    this.errorMessage = error.message || 'Failed to load employee data';
  }
}
