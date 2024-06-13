import { v4 as uuid } from 'uuid';

// **Cambiará el nombre del archivo a subir por uno único con UUID**
export const fileNamer = (
    _           : Express.Request,
    file        : Express.Multer.File,
    callback    : ( error: Error | null, acceptFile: string ) => void
) => {

    const fileExtension = file.mimetype.split( '/' )[1];
    const fileName      = `${uuid()}.${fileExtension}`;

    callback( null, fileName );
}