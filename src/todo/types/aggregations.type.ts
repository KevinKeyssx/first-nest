import { Field, Int, ObjectType } from "@nestjs/graphql";

import { IsNumber } from "class-validator";


@ObjectType({ description: 'Aggregations of todos' })
export class AggregationsType {

    @Field(() => Int)
    @IsNumber()
    total: number;


    @Field(() => Int)
    @IsNumber()
    pending: number;


    @Field(() => Int)
    @IsNumber()
    complete: number;


    @Field(() => Int, { deprecationReason: 'Use total' })
    @IsNumber()
    totalTodos: number;

}