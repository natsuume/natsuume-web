import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { IDistribution } from "aws-cdk-lib/aws-cloudfront";

const frontEndBuildOutputDirPath =
  process.env.FRONTEND_BUILD_OUT_DIR_PATH || "";

if (!frontEndBuildOutputDirPath) {
  throw new Error("FRONTEND_BUILD_OUT_DIR_PATH is not defined");
}

export class DeployStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    deployTargetBucket: IBucket,
    distribution: IDistribution,
    props?: StackProps,
  ) {
    super(scope, id, props);

    new BucketDeployment(this, "deployFrontEnd", {
      sources: [Source.asset(frontEndBuildOutputDirPath)],
      destinationBucket: deployTargetBucket,
      distribution: distribution,
      distributionPaths: ["/*"],
    });
  }
}
