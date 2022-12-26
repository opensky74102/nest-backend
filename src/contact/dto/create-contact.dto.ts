import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from "class-validator";

export class CreateContactDto{
  @IsNotEmpty()
  firstname:string;

  @IsNotEmpty()
  lastname:string;

  @IsNotEmpty()
  @IsEmail()
  email:string;

  @IsNotEmpty()
  message:string;
}