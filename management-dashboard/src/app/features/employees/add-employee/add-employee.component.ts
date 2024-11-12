import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../../shared/model/employee.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss'
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      id: [Math.floor(Math.random() * 1000)], // Simple ID generation
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const newEmployee: Employee = this.employeeForm.value;
      console.log('New Employee:', newEmployee);
      // Reset form after submission
      this.employeeForm.reset();
    }
  }

}
