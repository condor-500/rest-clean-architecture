import  {Request , Response } from 'express';
import { AuthRepository, 
        CustomError, 
        LoginUserDto, 
        LoginUserUserCase, 
        RegisterUser, 
        RegisterUserDto } from '../../domain';
import { UserModel } from '../../config/data/mongodb';





export class AuthController{

    constructor(
        private readonly authRepository:AuthRepository,
    ){}

    private handleError = (error: unknown, res: Response) =>{
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({error: error.message});
        }
        console.log(error); 
        return res.status(500).json({error: 'Internal Server Error'})

    }

    registerUser = (req: Request, res: Response ) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if ( error ) return res.status(400).json({ error });
        
        new RegisterUser(this.authRepository)
          .execute( registerUserDto! )
          .then( data => res.json(data) )
          .catch( error => this.handleError(error, res) );
      }


    loginUser = async(req: Request, res:Response) =>{
        const [error, loginUserDto] =   LoginUserDto.login(req.body);

        if(error) return res.status(400).json({ error });

        new LoginUserUserCase(this.authRepository)
            .execute(loginUserDto!)
            .then(data => res.json(data))
            .catch(error=>this.handleError(error, res));


    }

    getUser= (req: Request, res:Response) =>{
        UserModel.find()
        .then( users => res.json({
            users,
     
        
        }))
        .catch(()=> res.status(500).json({error:'Internal server error'}))
    }
}