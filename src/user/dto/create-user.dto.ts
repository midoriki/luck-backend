import { IsNotEmpty, Length, Matches } from 'class-validator';
import { Match } from '../../libs/validator/match.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(6, 30)
  @Matches(/^[a-z][\w]+$/)
  username: string;

  @IsNotEmpty()
  @Length(6, 100)
  @Matches(/^[\w][\w\s]+[\w]$/)
  name: string;

  @IsNotEmpty()
  @Length(6, 30)
  @Matches(/^[^\s]+$/)
  password: string;

  @IsNotEmpty()
  @Match('password')
  passwordConfirmation: string;
}
