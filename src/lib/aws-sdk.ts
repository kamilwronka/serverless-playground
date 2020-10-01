import * as Aws from "aws-sdk";
import * as bluebird from "bluebird";

Aws.config.setPromisesDependency(bluebird);
export default Aws;
