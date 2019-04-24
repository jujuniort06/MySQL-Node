import {RegisterMethods} from './register-method';
import {HttpMethod} from '../kernel/route-types';


export default function Get(url : string){
    return function (target : any, key : any = null , descriptor : any = null){
        new RegisterMethods(target, key, descriptor, HttpMethod.get, url);
    
        return descriptor;
    }
}