import { Injectable } from '@angular/core';
import { Poke } from './poke';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  url = `https://pokeapi.co/api/v2/pokemon`

  constructor() { }

  async getPokemonData(): Promise<Poke[]> {
    const data = await fetch(`${this.url}/?limit=151`);
    const object = await data.json() ?? [];
    
    const pokeDataPromises = object.results.map(async (element: { url: any; }) => {
      const pokeData = await fetch(element.url);
      const pokeObject = await pokeData.json() ?? [];
      return {
        id: pokeObject.id,
        name: pokeObject.name,
        types: pokeObject.types,
        pokeArtwork: pokeObject.sprites.other['official-artwork'].front_default
      };
    });
  
    const pokeDataArray = await Promise.all(pokeDataPromises);
    return pokeDataArray;
  }

  async getPokemonDetails(id: number): Promise<Poke | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const object = await data.json() ?? {};
    return object
  }
}
