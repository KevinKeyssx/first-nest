import { NestFactory } 		from '@nestjs/core';
import { ValidationPipe } 	from '@nestjs/common';

import { AppModule } from './app.module';


( async () => {
	const app = await NestFactory.create( AppModule );
	app.useGlobalPipes( new ValidationPipe({ 
		// *Whitelist solo deja pasar las propiedades que estén definidas en el DTO
		whitelist               : true,
		// *Indica con un mensaje más descriptivo que propiedad no están permitidas
		forbidNonWhitelisted	: true,
		// transform 				: true,
		// transformOptions        : {
		// 	enableImplicitConversion: true
		// }
	}));

	app.setGlobalPrefix( 'api' );

	await app.listen( 3000 );
})();