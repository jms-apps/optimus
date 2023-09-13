import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CnameRecord } from 'aws-cdk-lib/aws-route53';

interface FrontEndStackProps extends cdk.StackProps {
  environment: string;
  hostedZone: cdk.aws_route53.IHostedZone;
  certificate: cdk.aws_certificatemanager.ICertificate;
  DOMAIN_NAME: string;
}
export class FrontEndStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FrontEndStackProps) {
    super(scope, id, props);

    const { hostedZone, certificate, DOMAIN_NAME, environment } = props;
    const CNAME = `${environment}optimus.${DOMAIN_NAME}`;

    const bucket = new Bucket(this, `${environment}Optimus-fe`, {
      blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    new BucketDeployment(this, 'optimus-fe-bucket-deployment', {
      destinationBucket: bucket,
      sources: [
        Source.asset(path.resolve(__dirname, '../../../../dist/apps/fe')),
      ],
    });

    const originAccessIdentity = new OriginAccessIdentity(
      this,
      'OriginAccessIdentity'
    );
    bucket.grantRead(originAccessIdentity);

    const distribution = new Distribution(this, `${environment}optimus-fe`, {
      defaultRootObject: 'index.html',
      domainNames: [CNAME],
      certificate,
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
        },
      ],
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
      },
    });

    const cnameRecord = new CnameRecord(this, `${environment}optimusCname`, {
      zone: hostedZone,
      recordName: CNAME,
      domainName: distribution.distributionDomainName,
    });

    cnameRecord.node.addDependency(distribution);
  }
}
