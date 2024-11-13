import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListEmployeeComponent } from './list-employee.component';
import { EmployeeService } from '../../../core/services/employee.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchEmployeePipe } from '../../../shared/pipe/search-employee.pipe';
import { RouterModule } from '@angular/router';
import { DeletePopupComponent } from '../../../shared/components/delete-popup/delete-popup.component';
import { SuccessPopupComponent } from '../../../shared/components/success-popup/success-popup.component';

// Mock Employee Service
class MockEmployeeService {
  getEmployees() {
    return of([
      { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
    ]);
  }
}

describe('ListEmployeeComponent', () => {
  let component: ListEmployeeComponent;
  let fixture: ComponentFixture<ListEmployeeComponent>;
  let employeeService: MockEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, SearchEmployeePipe, RouterModule, DeletePopupComponent, SuccessPopupComponent],
      providers: [{ provide: EmployeeService, useClass: MockEmployeeService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListEmployeeComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should call getEmployeesList on init and populate employees', () => {
    // Spy on the getEmployees method
    spyOn(employeeService, 'getEmployees').and.callThrough();

    // Trigger ngOnInit manually
    component.ngOnInit();

    // Check if the getEmployees method was called
    expect(employeeService.getEmployees).toHaveBeenCalled();

    // Check if the employees array has been populated
    expect(component.employees.length).toBe(2);
    expect(component.employees[0].firstName).toBe('John');
    expect(component.employees[1].firstName).toBe('Jane');
  });
});
