import { Exclude, Expose, Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, ValidateNested } from "class-validator";

@Exclude()
export class Meme {
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
    @ValidateNested()
    @Type(() => Images)
    images: Images[];

    @Expose()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    score: number;

    constructor({ id, images, score, userId }: Meme) {
        this.userId = userId;
        this.id = id;
        this.images = images;
        this.score = score;
    }
}

@Exclude()
export class Images {
    @Expose()
    @IsNotEmpty()
    @IsString()
    thumbnail: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    original: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    standard: string;
}
