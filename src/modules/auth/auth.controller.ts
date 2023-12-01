import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { TokenData } from "@modules/auth";
import LoginDto from "./auth.dto";


export default class AuthController{
    private authService = new AuthService();
    
    public login = async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const model: LoginDto = req.body;
            const tokenData : TokenData = await this.authService.login(model);
            res.status(200).json(tokenData);
        } catch (error) {
            next(error);
        }
    };
}