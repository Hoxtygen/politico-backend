import { Request, Response, NextFunction } from 'express';
import { ValidatedUserSchema } from '../typedef';
import ApiError from './../errorHandler/apiError';
import { User } from './../typedef/index';

function validateUserData(schema: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validatedBody: ValidatedUserSchema = await schema.validate(req.body, { abortEarly: false });
            req.body = validatedBody;
            next()
        } catch (error: any) {
            next(ApiError.badRequest(error))
        }
    }
}

export default validateUserData;