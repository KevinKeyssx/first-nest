import { Controller, Get } 	from '@nestjs/common';
import { SeedService } 		from './seed.service';
// import { Auth, ValidRoles } from '../auth';


@Controller( 'seed' )
export class SeedController {
	constructor(
		private readonly seedService: SeedService
	) {}

	@Get()
	// @Auth( ValidRoles.user )
	executeSeed() {

		return this.seedService.runSeed();
	
	}

}
