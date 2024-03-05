import { Validators } from "../../../config";

export class LoginUserDto{
    private constructor(
        public email: string,
        public password: string
    ){}

    static login(object : {[key:string]:any}):[string?, LoginUserDto?]{
        const {email, password} = object;
        if(!email) return ['missing name'];
        if(!password) return ['missing passowrd'];
        if(!Validators.email.test(email)) return ['Email is not valid'];
        if(password.length < 6 ) return ['Password too short'];

        return[
            undefined,
            new LoginUserDto(
                email,
                password
            )
        ]

    }
    
}