import { Injectable } 		from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ProductsService } 	from 'src/products/products.service';
import { initialData } 		from './data/seed-data';
import { User } 			from 'src/auth';


@Injectable()
export class SeedService {

	constructor(
		private readonly productService: ProductsService,

		@InjectRepository( User )
		private readonly userRepository: Repository<User>
	) {}


	async runSeed() {
		await this.#deleteTables();
		const user = await this.#insertUsers()
		await this.#insertNewProducts( user );

		return 'SEED EXECUTED';
	}


	async #deleteTables() {
		await this.productService.deleteAllProducts();

		const queryBuilder = this.userRepository.createQueryBuilder();

		await queryBuilder
			.delete()
			.where({})
			.execute();
	}


	async #insertUsers() {
		const dbUsers = await this.userRepository.save(( await initialData() ).users );
		return dbUsers[0];
	}


	async #insertNewProducts( user: User ) {
		await this.productService.deleteAllProducts();

		const {products} = await initialData();
		await this.productService.createAllProducts( products, user );
	}
}
