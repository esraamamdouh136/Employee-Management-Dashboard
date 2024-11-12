import { Component, inject } from '@angular/core';
import { Employee } from '../../../shared/model/employee.model';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NamefilterPipe } from '../../../shared/components/pipe/filter.pipe';
import { EmployeeService } from '../../../core/services/employee.service';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';
import { SuccessPopupComponent } from '../../../shared/components/success-popup/success-popup.component';
@Component({
  selector: 'app-list-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, NamefilterPipe, RouterModule, DeletePopupComponent, SuccessPopupComponent],
  templateUrl: './list-employee.component.html',
  styleUrl: './list-employee.component.scss'
})
export class ListEmployeeComponent {
  private employeeService = inject(EmployeeService);
  showDeletePopup = false;
  showSuccessPopup = false;
  inputVal: string = '';
  employeeId! : number
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
    this.showDeletePopup = true;
    this.employeeId = id
   
  }
  handleDelete(){
    this.showDeletePopup = false;
    if(this.employeeId){
      this.employeeService.deleteEmployee(this.employeeId).subscribe(() => {
        this.employees = this.employees.filter((e) => e.id !== this.employeeId);
      });
      this.showSuccessPopup = true;
    }
  }
}
