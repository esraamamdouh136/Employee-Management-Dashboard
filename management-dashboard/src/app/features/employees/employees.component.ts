import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './employees.component.html',
})
export class EmployeesComponent { 
}
