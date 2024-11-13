import { Component, inject } from '@angular/core';
import { Employee } from '../../../shared/model/employee.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchEmployeePipe } from '../../../shared/pipe/search-employee.pipe';
import { EmployeeService } from '../../../core/services/employee.service';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';
import { SuccessPopupComponent } from '../../../shared/components/success-popup/success-popup.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SearchEmployeePipe,
    RouterModule,
    DeletePopupComponent,
    SuccessPopupComponent,
    BackButtonComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss',
})
export class ListEmployeeComponent {
  private employeeService = inject(EmployeeService);
  showDeletePopup = false;
  showSuccessPopup = false;
  inputVal: string = '';
  employeeId: number=1;
  employees: Employee[] = [];
  errorMessage: string;

  ngOnInit() {
    this.getEmployeesList();
  }
  getEmployeesList() {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        this.errorMessage = error.message || 'Failed to load employee data';
      },
    });
  }
  deleteEmployee(id: number): void {
    this.showDeletePopup = true;
    this.employeeId = id;
  }
  handleDelete() {
    this.showDeletePopup = false;
    if (this.employeeId) {
      this.employeeService.deleteEmployee(this.employeeId).subscribe({
        next: () => {
        this.employees = this.employees.filter((e) => e.id !== this.employeeId);
        this.showSuccessPopup = true;
        },
        error: (error) => {
          this.errorMessage = error.message || 'Failed to load employee data';
        },
      });
    }
  }
}
