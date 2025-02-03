import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';


// *Resolver es una clase que se va a encargar de manejar las peticiones GraphQL
// *Es como un rest controller pero para GraphQL
@Resolver()
export class GraphqlResolver {

    @Query(() => String, {
        description : 'This is a first query',
        name        : 'queryOne'
    } ) 
    firstQuery(): string {
        return 'Hello World';
    }

    @Query(() => Float, {
        description : 'This is a second query',
        name        : 'randomNumber'
    } )
    getRandomNumber(): number {
        return Math.random() * 100;
    }

    @Query(() => Int, {
        description : 'Take a random number from 0 to to, (Default to = 5)',
        name        : 'randomFromZero'
    } )
    getRandomFromZero(
        @Args( 'to', { type : () => Int, nullable : true }) to: number = 5
    ): number {
        return Math.floor(Math.random() * to);
    }

}
