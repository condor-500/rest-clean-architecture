import { Router } from "express";
import { AuthController } from "./controller";
import { AuthoDatasourceImpl, AuthoRepositoryImp } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
    static get routes() : Router{
        const router= Router();
        const database = new AuthoDatasourceImpl();
        const authRepository = new AuthoRepositoryImp(database);
        const controller = new AuthController(authRepository);

        //Definir las rutas rpincipales 

        router.post('/login',AuthMiddleware.validateJWT , controller.loginUser);
        router.post('/register', controller.registerUser);

        router.get('/', AuthMiddleware.validateJWT ,controller.getUser )


        return router;
    }
}