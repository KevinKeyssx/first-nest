import { Module }            	from '@nestjs/common';
import { ServeStaticModule } 	from '@nestjs/serve-static';
import { MongooseModule } 		from '@nestjs/mongoose';

import { join } from 'path';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';


@Module({
	imports: [
		ServeStaticModule.forRoot({
		// Esto sirva para configurar la carpeta publica web
		// Para que se pueda acceder a los archivos estaticos
			rootPath: join( __dirname, '..', 'public' )
		}),

		MongooseModule.forRoot('mongodb://localhost:27017/firs-nest-db-1'),

		PokemonModule,

		CommonModule,

		SeedModule
	]
})
export class AppModule {}
