import { Component, Input,Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Plants } from '../plants';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent {
  @Input() plants: Array<Plants>;
  @Output() plantClick = new EventEmitter<Plants>();

  onSelect(plant:Plants): void {
    this.plantClick.emit(plant)
  }
}

