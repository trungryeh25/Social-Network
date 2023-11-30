export default class RegisterDto{
    constructor(firstName: string, lastName: string, email: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
}