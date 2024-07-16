import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsIn,
    IsInt,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    MaxLength,
    Min,
    MinLength
} from "class-validator";


export class CreateProductDto {

    @IsString()
    @MinLength( 1 )
    @ApiProperty({
        example     : 'T-shirt',
        description : 'The title of the product',
    })
    title: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    @Min( 0 )
    @Max( 50000000 )
    @ApiProperty({
        example     : 10000,
        description : 'The price of the product',
        maxLength   : 0,
        minLength   : 50000000,
    })
    price?: number;

    @IsString()
    @IsOptional()
    @MinLength( 3 )
    @MaxLength( 200 )
    @ApiProperty({
        example     : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        description : 'The description of the product',
        maxLength   : 3,
        minLength   : 200,
    })
    description?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @IsString({ each: true })
    @IsArray()
    sizes: string[];

    @IsIn([ 'men', 'women', 'kids', 'unisex' ])
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags?: string[];

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

}
