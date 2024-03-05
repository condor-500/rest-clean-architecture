
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { CustomError } from "../../errors/custom.error";
import { AuthRepository } from "../../repositories/auth.repository";
import {JwtAdapter} from "../../../config";

interface UserToken {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }



type SignToken = (payload: Object, duration?: string) => Promise<string | null>;

interface RegisterUserUseCase {
    execute( registerUserDto: RegisterUserDto ): Promise<UserToken>;
  }

export class RegisterUser implements RegisterUserUseCase {

    constructor(
        private readonly authRepository:AuthRepository,
        private readonly singToken: SignToken = JwtAdapter.generateToken,
    ){}


   async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
       
        //crear ususario
        const user = await this.authRepository.register(registerUserDto);

        //token
        const token = await this.singToken({ id : user.id }, '2h');
        if ( !token ) throw CustomError.internalServer('Error generating token');
        return {
            token: token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            }
          };

    }
    
}




