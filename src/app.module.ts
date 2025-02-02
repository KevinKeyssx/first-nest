import { Module }           from '@nestjs/common';
import { GraphQLModule }    from '@nestjs/graphql';
import {
    ApolloDriver,
    ApolloDriverConfig
}                           from '@nestjs/apollo';

import { join } from 'path';
import { GraphqlModule } from './graphql/graphql.module';


@Module({
	imports     : [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver          : ApolloDriver,
            autoSchemaFile  : join( process.cwd(), 'src/schema.gql' ),
        }),
        GraphqlModule,
    ],
    controllers : [],
    providers   : [],
})
export class AppModule {}
