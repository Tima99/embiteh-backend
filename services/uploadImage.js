const path = require("path");
const {
    uniqueNamesGenerator,
    adjectives,
    colors,
} = require("unique-names-generator");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { Readable } = require("stream");
const { Upload } = require("@aws-sdk/lib-storage");

const uploadDir = path.join(__dirname, "../uploads");

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    },
});
const s3BucketName = process.env.S3_BUCKET_NAME;

const uploadImage = async (image, custom_adjectives = []) => {
    if (image && !/^image/.test(image.mimetype))
        throw new Error("Bad Image", {
            cause: {
                status: 400,
            },
        });

    const uniqueName = uniqueNamesGenerator({
        dictionaries: [custom_adjectives, adjectives, colors],
        separator: "-",
    });
    const imageExt = image && image.name.split(".").pop();
    const uploadImageName = `${uniqueName}.${imageExt}`;

    // Convert the file buffer to a stream
    const stream = Readable.from(image.data);

    // const params = {
    //     Bucket: s3BucketName,
    //     Key: uploadImageName,
    //     Body: stream,
    // };

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: s3BucketName,
            Key: uploadImageName,
            Body: stream,
        },
    });

    
    try {
        // await s3Client.send(new PutObjectCommand(params));
        await upload.done();

        return uploadImageName;
    } catch (err) {
        console.error("Error uploading to S3:", err);
        throw err;
    }
};

module.exports = uploadImage;
