import { NestFactory }  from '@nestjs/core';
import { AppModule }    from './app.module';
import { ValidationPipe } from '@nestjs/common';


( async () => {
    const app = await NestFactory.create( AppModule );
    app.useGlobalPipes( new ValidationPipe({ 
        // *Whitelist solo deja pasar las propiedades que estén definidas en el DTO
        whitelist               : true,
        // *Indica con un mensaje más descriptivo que propiedad no están permitidas
        forbidNonWhitelisted    : true,
        // transform               : true
    }) );

    await app.listen( 3000 )
}
)();
