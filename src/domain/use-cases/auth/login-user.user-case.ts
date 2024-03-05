
import {LoginUserDto} from "../../dtos/auth/login-user.dto";
import {AuthRepository} from "../../repositories/auth.repository";
import { JwtAdapter } from '../../../config';
import {CustomError} from "../../errors/custom.error";


interface LoginToken {
    email: string;
    password:string;
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>;
interface LoginUserUseCase {
    execute( loginUserDto: LoginUserDto ): Promise<LoginToken>;
}

 export class LoginUserUserCase implements LoginUserUseCase{

    constructor(
        private readonly authRepository:AuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken,
    ) {
    }


     async execute(loginUserDto: LoginUserDto): Promise<LoginToken> {

         const user = await this.authRepository.login(loginUserDto);
         console.log(user)

         const token = await this.signToken({ id: user.id }, '2h');
         if ( !token ) throw CustomError.internalServer('Error generating token');

         return {
             email: user.email,
             password: user.password
         }
     }






}