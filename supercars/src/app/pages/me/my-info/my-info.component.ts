import { Component } from '@angular/core';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-my-info',
  standalone: true,
  imports: [],
  templateUrl: './my-info.component.html',
  styleUrl: './my-info.component.css'
})
export class MyInfoComponent {

  user: User [] = []

}
