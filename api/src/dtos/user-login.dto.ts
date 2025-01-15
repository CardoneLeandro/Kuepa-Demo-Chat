import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty({ message: 'User Name is required' })
  @MinLength(4, { message: 'User Name must be at least 4 characters long' })
  @MaxLength(50, { message: 'User Name must be at most 50 characters long' })
  userName: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}