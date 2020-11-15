import { Component,Input } from '@angular/core';
import { Plants } from '../plants';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  @Input() plant: Plants;
}
