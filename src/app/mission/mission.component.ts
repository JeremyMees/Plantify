import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent {
  flower: AnimationOptions = {
    path: '../../assets/flower.json',
  };
  nature: AnimationOptions = {
    path: '../../assets/nature.json',
  };
}
