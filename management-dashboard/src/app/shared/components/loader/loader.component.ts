import { Component, inject } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  public loaderService = inject(LoaderService)

}
