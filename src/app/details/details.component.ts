import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokeService } from '../poke.service';
import { Poke } from '../poke';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  pokeService = inject(PokeService);
  poke: Poke | undefined;
  officialArtwork: string | undefined;
  pokemonGif: string | undefined;
  isLoaded: boolean = false;
  loaderText: string = '';

  constructor() {
    this.updateLoaderText()
    this.isLoaded = false
    const pokeID = parseInt(this.route.snapshot.params['id'], 10);
    this.pokeService.getPokemonDetails(pokeID).then(poke => {
      this.poke = poke;
      this.officialArtwork = poke?.sprites.other['official-artwork'].front_default;
      this.pokemonGif = poke?.sprites.other.showdown.front_default;
      this.isLoaded = true;
      const pokeName: any = poke?.name.toUpperCase()
      document.title = pokeName
    });
  }

  updateLoaderText(){
    setInterval(() => {
      this.loaderText += '.'
      if(this.loaderText === '....'){
        this.loaderText = ''
      }
    }, 250)
  }

}
