import mongoose from "mongoose";

interface Options{
    mongoUrl:string,
    dbName:string
}

export class MongoDatabase{
    static async connect(options:Options){

        const {dbName, mongoUrl} = options;
        try{
           await mongoose.connect(mongoUrl,{
                dbName:dbName
            });
            console.log('mongo connected');
            return true ;

        }catch(error){
        console.error('mongo error conecction');
        throw error;
        }
    }
}