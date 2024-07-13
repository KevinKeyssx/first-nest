import * as bcrypt from 'bcrypt';


export function encryptPassword( password: string ) {
    return bcrypt.hash( password, 10 );
}