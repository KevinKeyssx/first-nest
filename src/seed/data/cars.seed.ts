import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuid } from "uuid";


export const CARS_SEED: Car[] = [{
    id: uuid(),
    brand: 'BMW',
    model: 'M5',
},
{
    id: uuid(),
    brand: 'Audi',
    model: 'A6',
},
{
    id: uuid(),
    brand: 'Mercedes',
    model: 'E-Class',
},
{
    id: uuid(),
    brand: 'Porsche',
    model: 'Panamera',
},
{
    id: uuid(),
    brand: 'Tesla',
    model: 'Model S',
}];