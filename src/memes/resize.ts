import { AWSError, S3 } from "aws-sdk";
import { S3Object } from "aws-sdk/clients/rekognition";
import { get } from "lodash";
import * as sharp from "sharp";

const SIZES = {
    THUMBNAIL: 240,
    STANDARD: 720,
};

const calculateAspectRatio = (width, height) => {
    return width / height;
};

export function handler(event, context, callback) {
    console.log(event);
    const s3client = new S3();

    const params = {
        Bucket: `memes-bucket-${process.env.STAGE}`,
        Key:
            "7f63832d-2a1c-40f4-938d-58423d0742df/4ad2e8b4-4b70-4ade-8f16-65647b72de39.jpg",
    };

    s3client.getObject(params, async (err, data: S3.GetObjectOutput) => {
        if (err) {
            callback(err);
        }

        const standard = await sharp(data.Body).resize(720).webp().toBuffer();
        await sharp(data.Body).resize(720).webp().toFile("dupa.webp");

        // const image = sharp(data.Body);
        // const metadata = await image.metadata();

        // const thumbnail = await image.resize(SIZES.THUMBNAIL);

        const parameters: S3.PutObjectRequest = {
            Bucket: `memes-bucket-${process.env.STAGE}`,
            Key:
                "7f63832d-2a1c-40f4-938d-58423d0742df/4ad2e8b4-4b70-4ade-8f16-65647b72de39aaaa-standard.jpeg",
            Body: standard,
            ContentType: "image/webp",
        };

        s3client.putObject(parameters, (err, data: S3.PutObjectOutput) => {
            if (err) {
                callback(err);
            }

            callback(null, "done");
        });
    });

    // const params = {
    //     TableName: `memes-${process.env.ENVIRONMENT}`,
    //     Item: { id: objectId, userId, url: body.url, title: body.title },
    // };
}
