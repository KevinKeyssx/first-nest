import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import {
	CreateBrandDto,
	UpdateBrandDto
} from './dto';
import { Brand } from './entities/brand.entity';


@Injectable()
export class BrandsService {

	#brands: Brand[] = [];


	findAll = (): Brand[] => this.#brands;


	findOne( id: string ): Brand {

		const brand = this.#brands.find( brand => brand.id === id );

		if ( !brand ) throw new NotFoundException( `Brand id:'${id}' not found` );

		return brand;

	}


	create( createBrandDto: CreateBrandDto ): Brand {
		const brand: Brand = {
			id        : uuid(),
			name      : createBrandDto.name.toLowerCase(),
			createAt  : new Date().getTime(),
		};

		this.#brands.push( brand );

		return brand;
	}


	update( id: string, updateBrandDto: UpdateBrandDto ): Brand {
		let brandFind = this.findOne( id );

		this.#brands = this.#brands.map( brand => {
            if ( brand.id === id ) {
				brandFind.updateAt = new Date().getTime();
                brandFind = {
                    ...brandFind,
                    ...updateBrandDto,
                    id
                };
                return brandFind;
            }

            return brand;
        });

		return brandFind;

	}


	remove( id: string ): void {
		this.findOne( id );

		this.#brands = this.#brands.filter( brand => brand.id !== id );
	}


	fillBrandsWithSeed( brands: Brand[] ): void {
		this.#brands = brands;
	}
}
