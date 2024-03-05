import { NextFunction, Request, Response } from 'express';


import { UserModel } from '../../config/data/mongodb';
import {JwtAdapter} from "../../config";

export class AuthMiddleware{



    static validateJWT = async (req: Request, res:Response, next:NextFunction) => {
    
        const authorization = req.header('Authorization');
        if(!authorization) return res.status(401).json({error:'no token provide'});
        if(!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid Beared token'});
        const token = authorization.split(' ').at(1) || '';
        try {
            
            const payload = await  JwtAdapter.validatetoken<{id: string}>(token);
            if(!payload) return res.status(401).json({error:'Invalid token'});

            const user = await UserModel.findById(payload.id );
            if(!user) return res.status(401).json({error: 'Invalitad token- user not found '});

            
            req.body.user = user

        } catch (error) {
            console.log(error);
            res.status(500).json({error: 'Internal server Error'})
        }


        next();
    }
}