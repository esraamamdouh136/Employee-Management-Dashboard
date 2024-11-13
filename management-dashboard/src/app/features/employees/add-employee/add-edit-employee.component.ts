import { Component, inject } from '@angular/core';
import { Employee } from '../../../shared/model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../../../shared/components/employee-form/employee-form.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent {
  private employeeService = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  employee: Employee | null = null;
  formTitle = 'Add New Employee';
  submitButtonLabel = 'Add Employee';
   employeeId = 1
  ngOnInit() {
    this.checkheaderTitle()
   }

  checkheaderTitle(){
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((employee) => {
        this.employee = employee;
        this.formTitle = 'Edit Employee';
        this.submitButtonLabel = 'Update Employee';
      });
    }
  }

   handleFormSubmit(employeeData: Employee) {
    if (this.employee?.id) {
      const updatedEmployee = { ...employeeData, id: this.employee.id };
      this.employeeService.updateEmployee(updatedEmployee).subscribe(() => {   
        this.navigation()    
    });
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(() => {
        this.navigation()    
      });
    }
  }
  navigation(){
  this.router.navigate(['/employees/list']);
}
}
