import { BadRequestException, InternalServerErrorException, Logger } from "@nestjs/common";


export function handleError( error: any, name: string ): never {
    if ( error.code === '23505' ) {
        throw new BadRequestException( error.message );
    }

    new Logger( name ).error( error.message );

    throw new InternalServerErrorException( 'Unexpected error, check server logs' );
}