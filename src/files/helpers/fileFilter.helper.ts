// **Evaluara si el archivo es permitido o no
export const fileFilter = (
    _           : Express.Request,
    file        : Express.Multer.File,
    callback    : ( error: Error | null, acceptFile: boolean ) => void
) => {
    const fileExtension     = file.mimetype.split( '/' )[1];
    const validExtensions   = [ 'png', 'jpg', 'jpeg', 'gif' ];

    if ( !validExtensions.includes( fileExtension )) {
        return callback( null, false );
    }

    callback( null, true );
}