import {
	BadRequestException,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UploadedFile,
	UseInterceptors
} 							from '@nestjs/common';
import { FileInterceptor }	from '@nestjs/platform-express';
import { ConfigService } 	from '@nestjs/config';

import { Response }			from 'express';

import { diskStorage } from 'multer';

import { FilesService }				from './files.service';
import { fileFilter, fileNamer }	from './helpers';


@Controller( 'files' )
export class FilesController {

	constructor(
		private readonly filesService	: FilesService,
		private readonly configService	: ConfigService
	) {}


	@Get( 'product/:imageName' )
	findOneFile(
		@Res() res: Response,
		@Param( 'imageName' ) imageName: string
	) {

		const path = this.filesService.getStaticProductImage( imageName );

		res.sendFile( path );
	}


	@Post( 'product' )
	@UseInterceptors( FileInterceptor( 'file', {
		fileFilter,
		limits: {
			fileSize: 1024 * 1024 * 2
		},
		storage: diskStorage({
			destination	: './static/products',
			filename	: fileNamer
		})
	}))
	uploadFile(
		@UploadedFile() file: Express.Multer.File
	) {
		if ( !file ) throw new BadRequestException( 'No file provided' );

		return {
			secureUrl: `${this.configService.get('HOST_API')}/files/product/${file.filename}`
		};
	}

}
