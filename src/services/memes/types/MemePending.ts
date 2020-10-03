import { Exclude, Expose } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

@Exclude()
export class MemePending {
    @Expose()
    @IsNotEmpty()
    @IsString()
    id: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    url: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    tags: string[];

    constructor({ id, url, userId, title, tags }: MemePending) {
        this.url = url;
        this.id = id;
        this.userId = userId;
        this.title = title;
        this.tags = tags;
    }
}
