import { Exclude, Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, IsUrl } from "class-validator";

@Exclude()
export class CreateMemeRequestBody {
    @Expose()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    tags: string[];

    @Expose()
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;
}
