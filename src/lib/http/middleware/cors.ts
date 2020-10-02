import { APIGatewayProxyEvent } from "aws-lambda";
import BadRequest from "../../errors/BadRequest";

export const cors = (event: APIGatewayProxyEvent): void => {
    const corsOrigins = process.env.CORS_ORIGINS;
    let origin = "";

    if (event.headers != undefined) {
        origin = event.headers.Origin || event.headers.origin;
    }

    if (corsOrigins?.indexOf(origin) === -1) {
        throw new BadRequest("CORS origin not found .");
    }
};
