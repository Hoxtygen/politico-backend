import { Request, Response,NextFunction } from 'express';
import { ErrorT, ValidationT } from '../typedef';
import ApiError from './apiError';



export function getValidationErrors(err:any) {
    const validationErrors:ValidationT = {}
    err.inner.forEach((error:any) => {
        if (error.path) {
            validationErrors[error.path] = error.message;
        }
    });
    return validationErrors;
}

export function apiErroHandler(err:ErrorT , req:Request, res:Response, next:NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.code).json({
            status: 400,
            errors: getValidationErrors(err.message)
        })
    }
    return res.status(500).json({
        status: 500,
        message: "Something went wrong"
    })
}


