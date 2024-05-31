import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
} from '@nestjs/common';

import { CarsService }  from './cars.service';
import { CreateCarDTO } from './dtos/create-car.dto';
import { UpdateCarDTO } from './dtos/update-car.dto';


@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    // ParseIntPipe -> Convierte un string a number
    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4' }) ) id: string ) {
        return this.carsService.findOneById( id );
    }


    @Post()
    createCar( @Body() createCarDTO: CreateCarDTO ) {
        return this.carsService.addOne( createCarDTO );
    }


    @Patch( ':id' )
    updateCar(
        @Param( 'id', new ParseUUIDPipe({ version: '4' }) ) id: string,
        @Body() car: UpdateCarDTO
    ) {
        return this.carsService.updateOne( id, car );
    }


    @Delete(':id')
    deleteCar(
        @Param( 'id', new ParseUUIDPipe({ version: '4' }) ) id: string
    ) {
        this.carsService.deleteOne( id );
        return `Car id:'${id}' deleted`;
    }
}
