import { join } from 'path';
import { TodoModule } from './todo/todo.module';

import {
    ApolloDriver,
    ApolloDriverConfig
}                           from '@nestjs/apollo';
import { Module }           from '@nestjs/common';
import { GraphQLModule }    from '@nestjs/graphql';

import { GraphqlModule }                                from './graphql/graphql.module';
import { ApolloServerPluginLandingPageLocalDefault }    from '@apollo/server/plugin/landingPage/default';


@Module({
	imports     : [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver          : ApolloDriver,
            autoSchemaFile  : join( process.cwd(), 'src/schema.gql' ),
            playground      : false,
            plugins         : [ ApolloServerPluginLandingPageLocalDefault() ],
        }),
        GraphqlModule,
        TodoModule,
    ],
    controllers : [],
    providers   : [],
})
export class AppModule {}
