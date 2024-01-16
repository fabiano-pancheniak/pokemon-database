export interface Poke {
    id: number,
    name: string;
    types: { type: { name: string } }[];
    stats: {
        base_stat: number;
        stat: {name:string}
    }[];
    weight: string;
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            },
            showdown:{
                front_default: string
            }
        }
    }
    abilities: {
        ability: {name: string}
    }[];
    pokeGif: string;
    pokeArtwork: string;
}

