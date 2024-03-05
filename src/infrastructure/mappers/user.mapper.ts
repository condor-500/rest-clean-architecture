import { CustomError, UserEntity } from "../../domain";

export class UserMapper{
  static userEntityFromObject(object: {[key:string]:any}){

    const {id, _id, name, email, password, roles} = object;
    if(!_id || !id){
        throw CustomError.badRequest('missing id');
    }
    if(!name) throw CustomError.badRequest('missing name');
    if(!email) throw CustomError.badRequest('missing email');
    if(!password) throw CustomError.badRequest('missing password');
    if(!roles) throw CustomError.badRequest('missing roles');
    return new UserEntity(
        _id || id,
    name,
    email,
    password,
    roles

    );
  }
}