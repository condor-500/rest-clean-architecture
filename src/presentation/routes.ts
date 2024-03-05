import { Router } from "express";
import { AuthRoutes } from "./auth/routers";

export class AppRoutes {
    static get routes() : Router{
        const router= Router();

        //Definir las rutas rpincipales 

        router.use('/api/auth', AuthRoutes.routes );
        return router;
    }
}