import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeesComponent } from './features/employees/employees.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet , EmployeesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'management-dashboard';
}
