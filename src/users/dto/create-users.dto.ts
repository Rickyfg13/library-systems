import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/, {
    message:
      'Password harus terdiri dari 8 karakter alphanumeric dan mengandung setidaknya 1 huruf kapital',
  })
  password: string;
}
