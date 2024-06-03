import { Injectable } from '@nestjs/common';

import { PokeResponse } 	from './interfaces/poke-response.interface';
// import { PokemonService } 	from 'src/pokemon/pokemon.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } 	from 'src/common/adapters/axios.adapter';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

	constructor(
		@InjectModel( Pokemon.name )
		private readonly pokemonModel: Model<Pokemon>,
		// private readonly pokemonService: PokemonService,
		private readonly http: AxiosAdapter
	) {}


	async executeSeed(): Promise<any> {

		await this.pokemonModel.deleteMany();

		const data: PokeResponse = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon');

		const pokemon: CreatePokemonDto[] = data.results.map( poke => ({
			name	: poke.name,
			no		: Number(poke.url.split('/').filter( Boolean ).pop())
		}));

		await this.pokemonModel.insertMany( pokemon );

		return pokemon;
	}


	// !Este método es para usar el método directamente desde PokemonService
	// async executeSeed(): Promise<any> {

	// await this.pokemonModel.deleteMany();

	// 	const data: PokeResponse = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon');

	// 	const pokemon: CreatePokemonDto[] = data.results.map( poke => ({
	// 		name	: poke.name,
	// 		no		: Number(poke.url.split('/').filter( Boolean ).pop())
	// 	}));

	// 	await this.pokemonService.insertMany( pokemon );

	// 	return pokemon;
	// }

}
