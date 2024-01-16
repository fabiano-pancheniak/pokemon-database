import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Poke } from '../poke';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  @Input() poke!: Poke;
}
