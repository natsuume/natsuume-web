import * as cdk from "aws-cdk-lib";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import {
  Distribution,
  IDistribution,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import {
  ARecord,
  AaaaRecord,
  HostedZone,
  RecordTarget,
} from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket, IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

const hostedZoneId = process.env.HOSTED_ZONE_ID || "";
const certificateArn = process.env.CERTIFICATE_ARN || "";
const domainName = process.env.DOMAIN_NAME || "";

if (!hostedZoneId) {
  throw new Error("HOSTED_ZONE_ID is not defined");
}

if (!certificateArn) {
  throw new Error("CERTIFICATE_ARN is not defined");
}

if (!domainName) {
  throw new Error("DOMAIN_NAME is not defined");
}

export class BaseStack extends cdk.Stack {
  readonly frontEndBucket: IBucket;
  readonly distribution: IDistribution;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.frontEndBucket = new Bucket(this, "front-end-bucket", {
      bucketName: "natsuume-dev-front-end",
      websiteIndexDocument: "index.html",
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    this.distribution = new Distribution(this, "cloud-front", {
      defaultBehavior: {
        origin: new S3Origin(this.frontEndBucket),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: "index.html",
      domainNames: [domainName],
      certificate: Certificate.fromCertificateArn(
        this,
        "certificate",
        certificateArn,
      ),
    });

    new HostedZoneRecordsConstruct(
      this,
      "hosted-zone-records-construct",
      this.distribution,
    );
  }
}

/**
 * 個人ドメインのホストゾーンに対して、CloudFrontのディストリビューションを紐付ける
 */
class HostedZoneRecordsConstruct extends Construct {
  constructor(scope: Construct, id: string, distribution: IDistribution) {
    super(scope, id);

    const natsuumeDevHostedZone = HostedZone.fromHostedZoneId(
      this,
      "hosted-zone",
      hostedZoneId,
    );

    new ARecord(this, "a-record", {
      zone: natsuumeDevHostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });

    new AaaaRecord(this, "aaa-record", {
      zone: natsuumeDevHostedZone,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
  }
}
