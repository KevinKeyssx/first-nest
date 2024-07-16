import { ApiProperty } from '@nestjs/swagger';

import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';

import { ProductImage } from './product-image.entity';
import { User }         from '../../auth/entities/user.entity';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example     : 'ec2d3f60-5d61-4fa8-98da-dba2bd638010',
        description : 'The unique identifier of the product',
        //format      : 'uuid',
        uniqueItems : true,
    })
    @PrimaryGeneratedColumn( 'uuid' )
    id: string;

    @ApiProperty({
        example     : 'T-shirt',
        description : 'The title of the product',
        uniqueItems : true,
    })
    @Column( 'text', {
        unique: true
    } )
    title: string;

    @ApiProperty({
        example     : 0,
        description : ' The price of the product',
    })
    @Column( 'float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example     : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        description : 'The description of the product',
    })
    @Column({
        type        : 'text',
        nullable    : true
    })
    description: string;

    @Column( 'text',{
        unique: true
    })
    slug: string;

    @Column( 'int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example     : ['S', 'M', 'L', 'XL'],
        description : 'The sizes available for the product',
    })
    @Column( 'text', {
        array: true
    })
    sizes: string[];

    @Column( 'text' )
    gender: string;

    @Column( 'text', {
        array   : true,
        default : []
    })
    tags: string[];

    @OneToMany(
        () => ProductImage,
        image => image.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];


    @ManyToOne(
        () => User,
        user => user.product,
        { eager: true }
    )
    user : User;

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert() {
        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll( ' ', '_' )
            .replaceAll( "'", '' );
    }

}
