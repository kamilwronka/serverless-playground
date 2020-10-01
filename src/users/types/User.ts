import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";

@Exclude()
export class User {
  @Expose()
  @IsNotEmpty()
  @IsString()
  id: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Expose()
  @IsOptional()
  @IsString()
  profilePicture: string;

  constructor({ id, username, profilePicture = "", email }) {
    this.email = email;
    this.id = id;
    this.username = username;
    this.profilePicture = profilePicture;
  }
}
