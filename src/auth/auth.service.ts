import { Injectable, UnauthorizedException }		from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Repository } 		from 'typeorm/repository/Repository';
import * as bcrypt from 'bcrypt';

import { User } 			from './entities/user.entity';
import { handleError } 		from 'src/errors/handle-error';
import {
	LoginUserDto,
	CreateUserDto
} 							from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {

	constructor(
		@InjectRepository( User )
		private readonly userRepository: Repository<User>,

		private readonly jwtService: JwtService
	) {}


	async create( createUserDto: CreateUserDto ) {
		try {
			const { password, ...userData } = createUserDto;

			const user = this.userRepository.create({
				...userData,
				password: await bcrypt.hash( password, 10 )
			});

			await this.userRepository.save( user );
			delete user.password;

			return {
				...user,
				token: this.#getJwtToken({ email: user.email, id: user.id })
			};
		} catch ( error ) {
			handleError( error, AuthService.name );
		}

	}


	async login( loginUserDto: LoginUserDto ) {
		const { password, email } = loginUserDto;

		const user = await this.userRepository.findOne({
			where	: { email },
			select	: { email: true, password: true, id: true }
		});

		if ( !user ) {
			throw new UnauthorizedException( 'Invalid credentials' );
		}

		if ( !bcrypt.compareSync( password, user.password )) {
			throw new UnauthorizedException( 'Invalid credentials' );
		}

		return {
			...user,
			token: this.#getJwtToken({ email: user.email, id: user.id })
		}
	}


	checkAuthStatus = ( user: User ) => ({
		...user,
		token: this.#getJwtToken({ email: user.email, id: user.id })
	});


	#getJwtToken = ( payload: JwtPayload ) => this.jwtService.sign( payload );

}
