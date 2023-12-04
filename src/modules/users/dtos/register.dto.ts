import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export default class RegisterDto{
    constructor(firstName: string, lastName: string, email: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    @MinLength(6)
    public password: string;
}