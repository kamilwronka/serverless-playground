import { Exclude } from "class-transformer";

@Exclude()
export class User {
  id: string;
  username: string;
  profilePicture: string;
}
