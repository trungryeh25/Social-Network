import { IUser, TokenData } from '@modules/auth';
import { DataStoredInToken } from './../auth/auth.interface';
import { UserSchema } from '@modules/users';
import { isEmptyObject } from '@core/utils/helpers';
import { HttpException } from '@core/exceptions';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';

class AuthService{
    public userSchema = UserSchema;

    public async login(model: LoginDto): Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email});
        if(!user){
            throw new HttpException(409, `Your email ${model.email} already exist.`);
        }

        const isMatchPassword = await bcryptjs.compare(model.password, user.password);

        if (!isMatchPassword) 
            throw new HttpException(400, 'Credential is not valid');

        return this.createToken(user);
    }

    private createToken(user: IUser): TokenData{
        const dataInToken: DataStoredInToken = {id: user._id};
        const secret: string = process.env.JWT_TOKEN_SECRET!;
        const expiresIn: number = 60;
        return{
            token: jwt.sign(dataInToken, secret, {expiresIn:expiresIn})
        }
    }
}

export default AuthService;