import {
	Injectable,
	NotFoundException,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { ICreateProductDto, IUpdateProductDto } from 'src/dtos/product.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
	#products: Product[] = [
		{
			id: 1,
			name: 'Product 1',
			description: 'bla bla bla',
			price: 122,
			stock: 25,
			image: '',
			brand: 'Brand 1',
			createdAt: new Date(),
			updateAt: new Date(),
		},
	];

	findAll() {
		return this.#products;
	}

	findOne(id: number) {
		const product = this.#products.find((item) => item.id === id);
		if (!product) {
			// throw `Product #${id} not found`;
			throw new NotFoundException(`Product #${id} not found`);
		}
		return product;
	}

	create(payload: ICreateProductDto) {
		const newProduct: Product = {
			id: this.#products.length + 1,
			...payload,
			createdAt: new Date(),
			updateAt: new Date(),
		};
		this.#products.push(newProduct);
		return newProduct;
	}

	update(id: number, payload: IUpdateProductDto) {
		const product = this.findOne(id);
		const index = this.#products.findIndex((item) => item.id === id);
		if (index === -1) {
			return null;
		}
		this.#products[index] = {
			...product,
			...payload,
			updateAt: new Date(),
		};
		return this.#products[index];
	}

	delete(id: number) {
		const index = this.#products.findIndex((item) => item.id === id);
		if (index === -1) {
			// throw new NotFoundException(`Product #${id} not found`);
			throw new HttpException(
				`Product #${id} not found`,
				HttpStatus.BAD_REQUEST,
			);
		}
		// this.#products = this.#products.filter((item) => item.id !== id);
		this.#products.splice(index, 1);
		return true;
	}
}
