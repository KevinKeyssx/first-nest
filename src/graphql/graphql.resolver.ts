import { Query, Resolver } from '@nestjs/graphql';


// *Resolver es una clase que se va a encargar de manejar las peticiones GraphQL
// *Es como un rest controller pero para GraphQL
@Resolver()
export class GraphqlResolver {

    @Query(() => String )
    hello(): string {
        return 'Hello World';
    }

}
