import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(
		new ValidationPipe({
			// *Ignora los campos que no esten definidos en el DTO
			whitelist: true,
			// *Devuelve un error si hay campos que no esten definidos en el DTO
			forbidNonWhitelisted: true,
		}),
	);
	await app.listen(3000);
}
bootstrap();
