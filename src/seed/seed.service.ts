import { Injectable } from '@nestjs/common';

import { CarsService }    	from 'src/cars/cars.service';
import { BrandsService }	from 'src/brands/brands.service';
import {
	BRANS_SEED,
	CARS_SEED
} 							from './data';

@Injectable()
export class SeedService {

	constructor(

		private readonly cardService   : CarsService,
		private readonly brandService  : BrandsService

	){}


	populateDB() {

		this.cardService.fillCarsWithSeed( CARS_SEED ) ;
		this.brandService.fillBrandsWithSeed( BRANS_SEED );

		return 'Database populated successfully!';

	}

}
