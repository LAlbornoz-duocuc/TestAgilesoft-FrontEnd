import { Component, Input } from '@angular/core';
import { Actors } from '../../models/movies/actors';

@Component({
  selector: 'app-card-actor',
  standalone: true,
  imports: [],
  templateUrl: './card-actor.component.html',
  styleUrl: './card-actor.component.css'
})
export class CardActorComponent {
  @Input() actor!: Actors;
  @Input() imgUrl!: string;
}
