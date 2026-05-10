import { Component, Input } from '@angular/core';
import { INinja } from '../../interfaces/ininja';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {

  @Input() ninja!: INinja;

}
