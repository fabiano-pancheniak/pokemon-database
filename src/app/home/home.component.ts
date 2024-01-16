import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CardsComponent } from "../cards/cards.component";
import { PokeService } from '../poke.service';
import { Poke } from '../poke';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
 

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, CardsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
    pokeList: Poke[] = [];
    shortList: Poke[] = [];
    filteredList: Poke[] = [];
    pokeService: PokeService = inject(PokeService);
    pokeNotFound: boolean = false;
    isLoaded: boolean = false;
    loaderText: string = '';
    
    constructor(private spinner: NgxSpinnerService) {
      this.updateLoaderText()
        this.pokeService.getPokemonData().then((pokeList: Poke[]) => {
            this.pokeList = pokeList;
            this.filteredList = this.shortList;
            this.getShortList()
        })
    }

    updateLoaderText(){
      setInterval(() => {
        this.loaderText += '.'
        if(this.loaderText === '....'){
          this.loaderText = ''
        }
      }, 250)
    }

    getShortList(){
      this.isLoaded = false;
      const randomOffset = Math.floor(Math.random() * 132);
      for(let i = randomOffset; i < this.pokeList.length; i++){
        if(this.shortList.length < 20){
          this.shortList.push(this.pokeList[i])
        }
      }
      this.isLoaded = true;
      return this.shortList
    }

    search(text: string){
      this.pokeNotFound = false;
      
      if(!text){
        this.filteredList = this.shortList
        return;
      }
      
      
      this.filteredList = this.pokeList.filter(
        poke => poke?.name.toLowerCase().startsWith(text.toLowerCase())
      );

      if(this.filteredList.length == 0){
        this.pokeNotFound = true
        return;
      }
    }
}
