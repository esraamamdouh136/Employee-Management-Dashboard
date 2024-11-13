import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [NgIf],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
@Input() errorMessage : string 
}
