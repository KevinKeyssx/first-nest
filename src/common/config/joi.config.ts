import * as Joi from 'joi';


export const JoiConfigurationSchema =  Joi.object({

    MONGODB         : Joi.required(),
    PORT            : Joi.number().default( 3005 ),
    DEFAULTLIMIT    : Joi.number().default( 5 ),

});
