import {
	Injectable,
	NotFoundException
}							from '@nestjs/common';
import { InjectRepository }	from '@nestjs/typeorm';

import { DataSource, Repository } 	from 'typeorm';
import { validate as isUUID } 		from 'uuid';

import { CreateProductDto }	from './dto/create-product.dto';
import { UpdateProductDto }	from './dto/update-product.dto';
import { handleError } 		from '../errors/handle-error';
import { PaginationDto } 	from '../common/dtos/pagination';
import { User } 			from 'src/auth';
import {
	Product,
	ProductImage
} 							from './entities';


@Injectable()
export class ProductsService {

	constructor(
		@InjectRepository( Product )
		private readonly productRepository: Repository<Product>,

		@InjectRepository( ProductImage )
		private readonly productImageRepository: Repository<ProductImage>,

		private readonly dataSource: DataSource,
	) {}


	async create( createProductDto: CreateProductDto, user: User ) {
		try {
			const { images = [], ...productDetails } = createProductDto;

			const product = this.productRepository.create({
				...productDetails,
				images: images.map( image => this.productImageRepository.create({ url: image })),
				user
			});

			await this.productRepository.save( product );

			return { ...product, images };
		} catch ( error ) {
			handleError( error, ProductsService.name );
		}
	}

	async createAllProducts( products: CreateProductDto[], user: User ) {
		try {
			const productsEntities = products.map( product => {
				const { images = [], ...productDetails } = product;
				return this.productRepository.create({
					...productDetails,
					images: images.map( image => this.productImageRepository.create({ url: image })),
					user
				});
			});

			await this.productRepository.save( productsEntities );

			return productsEntities.map( product => this.findProductPlain( product ));
		} catch ( error ) {
			handleError( error, ProductsService.name );
		}
	}


	findAll = async ({ limit = 10, offset = 0 }: PaginationDto ) =>
		(await this.productRepository.find({
			take	: limit,
			skip	: offset,
			relations: {
				images: true
			}
		}))
		.map( product => ( this.findProductPlain( product )));


	async findOne( term: string ) {
		let product: Product;

		if ( isUUID( term ))
			product = await this.productRepository.findOneBy({ id: term });
		else {
			const query = this.productRepository.createQueryBuilder( 'prod' );
			product = await query.where( 'LOWER(title) =:title or slug =:slug', {
				title	: term.toLowerCase(),
				slug	: term.toLowerCase()
			})
			.leftJoinAndSelect( 'prod.images', 'images' )
			.getOne();
		}

		if ( !product ) {
			throw new NotFoundException( `Product with term ${term} not found` );
		}

		return this.findProductPlain( product );
	}


	findProductPlain = ( product: Product ) => ({
		...product,
		images: product.images.map( image => image.url	)
	});


	async update( term: string, updateProductDto: UpdateProductDto, user: User ) {

		const { images, ...toUpdate } = updateProductDto;

		const product = await this.productRepository.preload({ id: term, ...toUpdate });

		if ( !product ) {
			throw new NotFoundException( `Product with id #${term} not found` );
		}

		//Create query runner
		// const queryRunner = this.productRepository.manager.connection.createQueryRunner();
		// await queryRunner.connect();
		// await queryRunner.startTransaction();

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {

			if ( images ) {
				await queryRunner.manager.delete( ProductImage, { product });
				product.images = images.map( image => this.productImageRepository.create({ url: image }));
			}
			else {
				product.images = await this.productImageRepository.findBy({ product });
			}
		
			product.user = user;
			await queryRunner.manager.save( product );
			console.log('***HACE EL SAVE');
			
			await queryRunner.commitTransaction();
			console.log('***HACE LA TRANSACCION');

			await queryRunner.release();
			console.log('***HACE EL RELEASE');



			// return await this.productRepository.save( product );

			return this.findProductPlain( product );
			// return product;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();
			handleError( error, ProductsService.name );
		}
	}


	async remove( term: string ) {
		await this.findOne( term );
		const deleted = await this.productRepository.delete( term );
		return deleted.affected > 0;
	}


	async deleteAllProducts() {
		await this.productRepository.delete({});
		return true;
	}

	async deleteAllProductsQueryBuilder() {
		const query = this.productRepository.createQueryBuilder( 'prod' );

		try {
			return await query
			.delete()
			.where({})
			.execute();
		} catch ( error ) {
			handleError( error, ProductsService.name );
		}
	}
}
