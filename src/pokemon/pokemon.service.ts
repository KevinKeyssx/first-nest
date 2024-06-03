import {
	BadRequestException,
	Injectable
} 							from '@nestjs/common';
import { ConfigService }	from '@nestjs/config';
import { InjectModel } 		from '@nestjs/mongoose';


import {
	FilterQuery,
	isValidObjectId,
	Model,
	Document
} from 'mongoose';

import { CreatePokemonDto }	from './dto/create-pokemon.dto';
import { UpdatePokemonDto }	from './dto/update-pokemon.dto';
import { Pokemon }         	from './entities/pokemon.entity';
import { handleExceptions }	from 'src/error/handle-exceptions';
import { PaginationDto } 	from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

	constructor(
		@InjectModel( Pokemon.name )
		private readonly pokemonModel	: Model<Pokemon>,
		private readonly configService	: ConfigService
	) {}

	async create(createPokemonDto: CreatePokemonDto) {

		createPokemonDto.name = createPokemonDto.name.toLowerCase();

		try {
		return await this.pokemonModel.create( createPokemonDto );
		} catch (error) {
		handleExceptions( error );
		}

	}


	findAll( pagenationDto: PaginationDto ) {
		const {limit = 10, offset = 0 } = pagenationDto;

		return this.pokemonModel
		.find()
		.limit( limit )
		.skip( offset )
		.sort( { no: 1 } )
		.select('-__v');
	}


	async findOne(
		term: string
	)
	: Promise<Document<unknown, object, Pokemon> & Pokemon & Required<{ _id: unknown; }>>  {
		let find: FilterQuery<Pokemon> = { name: term.toLowerCase().trim() } ;

		if ( !isNaN( +term ))               find = { no: parseInt(term) };
		else if ( isValidObjectId( term ))  find = { _id: term };

		const pokemon = await this.pokemonModel.findOne( find );

		if ( !pokemon ) {
			throw new BadRequestException( `Pokemon not found ${term}` );
		}

		return pokemon;
	}


	async update(
		term              : string,
		updatePokemonDto  : UpdatePokemonDto
	): Promise<Document<Pokemon>> {
		const pokemon = await this.findOne( term );

		if ( updatePokemonDto.name )
		updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

		try {
			await pokemon.updateOne( updatePokemonDto ) ;

			return {
			...pokemon.toJSON(),
			...updatePokemonDto
			}
		} catch (error) {
		handleExceptions( error );
		}
	}


	async remove(id: string) {

		const { deletedCount } = await this.pokemonModel.deleteOne( { _id: id } );

		if ( !deletedCount ) {
		throw new BadRequestException( `Pokemon not found ${id}` );
		}

		return true;

	}


	// async insertMany( pokemons: CreatePokemonDto[] ) {
	// 	try {
	// 		return await this.pokemonModel.insertMany( pokemons );
	// 	} catch (error) {
	// 		handleExceptions( error );
	// 	}
	// }
}
