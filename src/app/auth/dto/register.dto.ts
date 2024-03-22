export class RegisterDto {
    public name?: string
    public surname?: string;
    public email?: string;
    public password?: string;
    public identifier?: string;


    constructor(name: string, surname: string, email: string, password: string, identifier: string) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.identifier = identifier;
    }
}
