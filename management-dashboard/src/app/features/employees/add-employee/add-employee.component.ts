import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../shared/model/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFormComponent } from '../../../shared/components/employee-form/employee-form.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  // employeeForm: FormGroup;

  // constructor(private fb: FormBuilder) {
  //   this.employeeForm = this.fb.group({
  //     id: [Math.floor(Math.random() * 1000)], // Simple ID generation
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //   });
  // }

  // onSubmit() {
  //   if (this.employeeForm.valid) {
  //     const newEmployee: Employee = this.employeeForm.value;
  //     console.log('New Employee:', newEmployee);
  //     // Reset form after submission
  //     this.employeeForm.reset();
  //   }
  // }
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  employee: Employee | null = null;
  formTitle = 'Add New Employee';
  submitButtonLabel = 'Add Employee';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(+id).subscribe((employee) => {
        this.employee = employee;
        this.formTitle = 'Edit Employee';
        this.submitButtonLabel = 'Update Employee';
      });
    }
  }

  handleFormSubmit(employeeData: Employee) {
    if (this.employee?.id) {
      const updatedEmployee = { ...employeeData, id: this.employee.id };
      this.employeeService.updateEmployee(updatedEmployee).subscribe(() => this.router.navigate(['/employees']));
    } else {
      this.employeeService.addEmployee(employeeData).subscribe(() => this.router.navigate(['/employees']));
    }
  }

}
