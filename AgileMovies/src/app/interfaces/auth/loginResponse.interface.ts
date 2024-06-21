import { Payload } from "../../models/auth/payload";
import { User } from "../../models/auth/user";

export interface LoginResponse{
    data:{
        user: User;
        payload: Payload;
    }
    
}