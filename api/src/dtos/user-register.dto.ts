import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { USERS_ROLES } from '../config/roles.config';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Full name is required' })
  @MinLength(4, { message: 'Your full name must be at least 4 characters long' })
  @MaxLength(50, { message: 'Your full name must be at most 50 characters long' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'User Name is required' })
  @MinLength(4, { message: 'User Name must be at least 4 characters long' })
  @MaxLength(50, { message: 'User Name must be at most 50 characters long' })
  userName: string;

  @IsString()
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  password: string;

  @IsNotEmpty({ message: 'Confirmation password is required' })
  @MinLength(4, { message: 'Password must be at least 4 characters long' })
  confirmPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Role is required' })
  role: "user" | "moderator";
}