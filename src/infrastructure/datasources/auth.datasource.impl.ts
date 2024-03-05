
import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../config/data/mongodb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string)=> string;
type CompareFunction = (password: string, hashed:string)=> boolean;

export class AuthoDatasourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash ,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare
    ){}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
       
        const {email, password } = loginUserDto;
        try {
            const user = await UserModel.findOne({ email });


            if ( !user ) throw CustomError.badRequest('User does not exists - email');
            const isMatching = this.comparePassword(password, user.password);
            if ( !isMatching ) throw CustomError.badRequest('Password is not valid');

            return UserMapper.userEntityFromObject(user);

        } catch (error) {
            console.log(error);
            throw CustomError.internalServer();
        }
    }


    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name , email, password} = registerUserDto;
        try{
            const exist = await UserModel.findOne({email});
            if(exist) throw CustomError.badRequest('User already exists');

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password) ,
            });

            await user.save();


            return UserMapper.userEntityFromObject(user);


        }catch(error){
            if(error instanceof CustomError){
                throw  error;
            }
            throw CustomError.internalServer();
        }
    }

}