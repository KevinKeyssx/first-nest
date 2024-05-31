import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';

import { v4 as uuid } from 'uuid';
import {
    CreateCarDTO,
    UpdateCarDTO
} from './dtos';

@Injectable()
export class CarsService {

    #cars: Car[] = [];


    findAll() {
        return this.#cars;
    }


    findOneById( id: string ) {
        const car = this.#cars.find( car => car.id == id );

        if ( !car ) throw new NotFoundException( `Car id:'${id}' not found` );

        return car;
    }


    addOne( car: CreateCarDTO ) {
        const carExists = this.#cars.find( c => c.brand == car.brand && c.model == car.model );

        if ( carExists ) throw new BadRequestException( `Car brand:'${car.brand}' and model:'${car.model}' already exists` );

        this.#cars.push({
            id: uuid(),
            ...car
        } as Car );

        return car;
    }


    updateOne( id: string, updateCarDTO: UpdateCarDTO ) {
        let carFind = this.findOneById( id );

        this.#cars = this.#cars.map( car => {
            if ( car.id == id ) {
                carFind = {
                    ...car,
                    ...updateCarDTO,
                    id
                };
                return carFind;
            }

            return car;
        });

        return  carFind;
    }


    deleteOne( id: string ) {
        this.findOneById( id );

        this.#cars = this.#cars.filter( car => car.id != id );
    }


    fillCarsWithSeed( cars: Car[] ) {
        this.#cars = cars;
    }


}
