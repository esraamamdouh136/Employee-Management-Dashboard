import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back-button.component.html',
})
export class BackButtonComponent {
@Input() routeUrl : string
}
