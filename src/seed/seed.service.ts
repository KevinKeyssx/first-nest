import { Injectable } 		from '@nestjs/common';
import { ProductsService } 	from 'src/products/products.service';
import { initialData } 		from './data/seed-data';

@Injectable()
export class SeedService {

	constructor(
		private readonly productSerivce: ProductsService
	) {}
	
	async runSeed() {
		await this.#insertNewProducts();
		return 'SEED EXECUTED';
	}


	async #insertNewProducts() {
		await this.productSerivce.deleteAllProducts();

		const products = initialData.products;
		await this.productSerivce.createAllProducts( products );
	}

}
