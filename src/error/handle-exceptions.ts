import { BadRequestException, InternalServerErrorException } from "@nestjs/common"

export function handleExceptions ( error: any ) {

    if ( error.code === 11000 ) {
        throw new BadRequestException( `Pokemon already exists ${ JSON.stringify( error.keyValue ) }` );
    }

    throw new InternalServerErrorException( `Can't create Pokemon - Check server logs` );

}