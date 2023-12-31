import { TokenData } from '@modules/auth';
import { DataStoredInToken } from './../auth/auth.interface';
import RegisterDto from './dtos/register.dto';
import UserSchema from './users.model';
import { isEmptyObject } from '@core/utils/helpers';
import { HttpException } from '@core/exceptions';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import IUser from './users.interface';
import jwt from 'jsonwebtoken';

class UserService{
    public userSchema = UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData>{
        if(isEmptyObject(model)){
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.userSchema.findOne({email: model.email});
        if(await user){
            throw new HttpException(409, `Your email ${model.email} already exist.`);
        }

        const avatar = gravatar.url(model.email!, {
            size: '200',
            rating: 'g',
            default: 'mm',
        });

        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        const createdUser = await this.userSchema.create({
            ...model,
            password: hashedPassword,
            avatar: avatar,
            date: Date.now(),
        });
        return this.createToken(createdUser);
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

export default UserService;