import {
	IsString,
	IsNumber,
	IsUrl,
	IsNotEmpty,
	IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class ICreateProductDto {
	@IsString()
	@IsNotEmpty()
	readonly name: string;

	@IsString()
	@IsNotEmpty()
	readonly description: string;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	readonly price: number;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	readonly stock: number;

	@IsUrl()
	@IsNotEmpty()
	readonly image: string;

	@IsString()
	@IsNotEmpty()
	readonly brand: string;
}

export class IUpdateProductDto extends PartialType(ICreateProductDto) {}
// export type IUpdateProductDto = Partial<ICreateProductDto>;
// export interface IUpdateProductDto extends PartialType(ICreateProductDto);

