export class RegisterDto {
  public name: string
  public surname: string;
  public email: string;
  public password: string;


  constructor(name: string, surname: string, email: string, password: string) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
  }
}
