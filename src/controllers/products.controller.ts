import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Query,
	HttpCode,
	HttpStatus,
	Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from 'src/services/products.service';
import { ParseIntPipe } from '../common/parse-int/parse-int.pipe';
import { ICreateProductDto, IUpdateProductDto } from '../dtos/product.dtos';

@Controller('products')
export class ProductsController {
	constructor(private productsService: ProductsService) {}
	// Para que no choque con el otro endpoint
	@Get('/filter')
	filter() {
		return `yo soy groove`;
	}

	@Get(':productId')
	@HttpCode(HttpStatus.ACCEPTED)
	getOne(@Param('productId', ParseIntPipe) productId: number) {
		// *Con Nest
		return this.productsService.findOne(productId);
		// *Con Express
		// @Res() response: Response
		// response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).send({
		// message: `product ${productId}`,
		// });
	}

	@Get()
	getAll(
		@Query('limit') limit = 100,
		@Query('offset') offset = 0,
		@Query('brand') brand: string,
	) {
		return this.productsService
			.findAll()
			.filter((item) => (brand ? item.brand === brand : item))
			.slice(offset, limit);
	}

	@Post()
	create(@Body() payload: ICreateProductDto) {
		return this.productsService.create(payload);
	}

	@Put(':id')
	update(@Param('id') id: string, @Body() payload: IUpdateProductDto) {
		return this.productsService.update(+id, payload);
	}

	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.productsService.delete(+id);
	}
}
