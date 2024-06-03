import { NestFactory }		from '@nestjs/core';
import { AppModule }      	from './app.module';
import { ValidationPipe } 	from '@nestjs/common';


( async () => {
	const app = await NestFactory.create( AppModule );
	app.useGlobalPipes( new ValidationPipe({ 
		// *Whitelist solo deja pasar las propiedades que estén definidas en el DTO
		whitelist               : true,
		// *Indica con un mensaje más descriptivo que propiedad no están permitidas
		forbidNonWhitelisted    : true,
		transform 				: true,
		transformOptions        : {
			enableImplicitConversion: true
		}
	}) );

	app.setGlobalPrefix( 'api/v2' );

	await app.listen( process.env.PORT );
})();