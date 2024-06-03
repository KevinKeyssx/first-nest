import { Module }            	from '@nestjs/common';
import { ServeStaticModule } 	from '@nestjs/serve-static';
import { MongooseModule } 		from '@nestjs/mongoose';
import { ConfigModule } 		from '@nestjs/config';

import { join } from 'path';

import { PokemonModule }	from './pokemon/pokemon.module';
import { CommonModule } 	from './common/common.module';
import { SeedModule } 		from './seed/seed.module';
import {
	EnvConfiguration,
	JoiConfigurationSchema
} 							from './common/config';


@Module({
	imports: [
		ConfigModule.forRoot({
			load				: [ EnvConfiguration ],
			validationSchema	: JoiConfigurationSchema,
		}),

		ServeStaticModule.forRoot({
		// *Esto sirva para configurar la carpeta publica web
		// *Para que se pueda acceder a los archivos estaticos
			rootPath: join( __dirname, '..', 'public' )
		}),

		MongooseModule.forRoot( process.env.MONGODB, {
			dbName:  process.env.MONGODB_NAME
		} ),

		PokemonModule,

		CommonModule,

		SeedModule,
	]
})
export class AppModule {}
