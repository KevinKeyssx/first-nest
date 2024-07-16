import { NestFactory } 				from '@nestjs/core';
import { Logger, ValidationPipe } 	from '@nestjs/common';
import {
	DocumentBuilder,
	SwaggerModule
} 									from '@nestjs/swagger';

import { AppModule } from './app.module';


( async () => {
	const app 		= await NestFactory.create( AppModule );
	const logger 	= new Logger( 'Main' );

	app.useGlobalPipes( new ValidationPipe({ 
		// *Whitelist solo deja pasar las propiedades que estén definidas en el DTO
		whitelist               : true,
		// *Indica con un mensaje más descriptivo que propiedad no están permitidas
		forbidNonWhitelisted	: true,
		// *Esto transforma los tipos de datos de las propiedades a los definidos en el DTO
		// *Pero también se pueden transformar por cada DTO
		// transform 				: true,
		// transformOptions        : {
		// 	enableImplicitConversion: true
		// }
	}));

	app.setGlobalPrefix( 'api' );
	app.enableCors({
		// origin			: '*',
		origin			: 'http://localhost:5173',
		methods			: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders	: ['Content-Type', 'Authorization', 'authentication', 'hola'],
		credentials		: true,
	});

	const config = new DocumentBuilder()
		.setTitle('Teslo API Documentation')
		.setDescription('TesloShop API Documentation')
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument( app, config );
	SwaggerModule.setup( 'api', app, document );

	await app.listen( process.env.PORT || 3000);
	logger.log( `Application is running on: ${process.env.HOST_API}:${ process.env.PORT }`);
})();