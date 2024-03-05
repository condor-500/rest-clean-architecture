import { Validators } from "../../../config";

export class  RegisterUserDto{
   private constructor(
        public name: string,
        public email : string,
        public password: string,
    ){}

    static create(object : {[key:string]:any}):[string?, RegisterUserDto?]{

        const { name , email , password} = object;

        if(!name) return ['missing name'];
        if(!email) return ['missing email'];
        if(!Validators.email.test(email)) return ['Email is not valid'];
        if(!password) return ['missing password'];
        if(password.length < 6 ) return ['Password too short'];

        return [
            undefined,
            new RegisterUserDto(
                name , email.toLowerCase(), password
            )
        ];
    }

}