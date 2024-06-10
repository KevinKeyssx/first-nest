import {
	Injectable,
	NotFoundException
}								from '@nestjs/common';
import { InjectRepository } 	from '@nestjs/typeorm';
import { Repository } 			from 'typeorm';

import { validate as isUUID } from 'uuid';

import { CreateProductDto }		from './dto/create-product.dto';
import { UpdateProductDto }		from './dto/update-product.dto';
import { Product } 				from './entities/product.entity';
import { handleError } 			from 'src/errors/handle-error';
import { PaginationDto } 		from 'src/common/dtos/pagination';


@Injectable()
export class ProductsService {

	constructor(
		@InjectRepository( Product )
		private readonly productRepository: Repository<Product>
	) {}

	async create( createProductDto: CreateProductDto ) {

		try {
			const product = this.productRepository.create( createProductDto );
			await this.productRepository.save( product );

			return product;
		} catch ( error ) {
			handleError( error, ProductsService.name );
		}
	}


	findAll = async ({ limit = 10, offset = 0 }: PaginationDto ) =>
		await this.productRepository.find({
			take	: limit,
			skip	: offset
			// TODO: Relaciones
		});


	async findOne( term: string ) {
		let product: Product;

		if ( isUUID( term ))
			product = await this.productRepository.findOneBy( { id: term } )
		else {
			const query = this.productRepository.createQueryBuilder();
			product = await query.where( 'LOWER(title) =:title or slug =:slug', {
				title	: term.toLowerCase(),
				slug	: term.toLowerCase()
			}).getOne();
		}

		if ( !product ) {
			throw new NotFoundException( `Product with term ${term} not found` );
		}

		return product;
	}


	async update( id: string, updateProductDto: UpdateProductDto ) {
		const product = await this.productRepository.preload({
			id,
			...updateProductDto
		});

		if ( !product ) {
			throw new NotFoundException( `Product with id #${id} not found` );
		}

		try {
			return await this.productRepository.save( product );
		} catch (error) {
			handleError( error, ProductsService.name );
		}
	}


	async remove( id: string ) {
		await this.findOne( id );
		const deleted = await this.productRepository.delete( id );
		return deleted.affected > 0;
	}
}
