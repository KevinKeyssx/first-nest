import {
	Controller,
	Get,
	Post,
	Body,
	HttpCode,
	UseGuards
} 						from '@nestjs/common';
import { AuthGuard }	from '@nestjs/passport';
import { ApiTags } 		from '@nestjs/swagger';

import {
	CreateUserDto,
	LoginUserDto
} 							from './dto';
import { AuthService } 		from './auth.service';
import { User } 			from './entities/user.entity';
import { UserRoleGuard }	from './guards/user-role.guard';
import { ValidRoles } 		from './interfaces';
import {
	GetUser,
	RoleProtected,
	RawHeaders,
	Auth
} 							from './decorators';


@Controller('auth')
@ApiTags( 'Auth' )
export class AuthController {
    constructor(
		private readonly authService: AuthService
    ) {}

    @Post( 'register' )
    createUser( @Body() createUserDto: CreateUserDto ) {
		return this.authService.create( createUserDto );
    }


	@Post( 'login' )
	@HttpCode( 200 )
    loginUser( @Body() loginUserDto: LoginUserDto ) {
		return this.authService.login( loginUserDto );
    }


	@Get( 'check-status' )
	@Auth()
	chechAuthStatus(
		@GetUser() user: User
	) {
		return this.authService.checkAuthStatus( user );
	}


	@Get( 'private' )
	@UseGuards( AuthGuard() )
	testingPrivateRoute(
		@GetUser() user				: User,
		@GetUser('email') userEmail : string,
		@RawHeaders() rawHeaders    : string[]
	) {
		return {
		user,
		userEmail,
		rawHeaders
		};
	}

	@Get( 'private2' )
	@RoleProtected( ValidRoles.userUser )
	@UseGuards( AuthGuard(), UserRoleGuard )
	testingPrivateRoute2(
		@GetUser() user: User,
	) {
		return {
		ok: true,
		user
		};
	}


	@Get( 'private3' )
	@Auth( ValidRoles.admin )
	testingPrivateRoute3(
		@GetUser() user: User,
	) {
		return {
		ok: true,
		user
		};
	}
}
