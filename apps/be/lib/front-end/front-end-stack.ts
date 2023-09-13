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
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';
import { CnameRecord, HostedZone } from 'aws-cdk-lib/aws-route53';

const DOMAIN_NAME = 'sujanashah.com';
const CNAME = `optimus.${DOMAIN_NAME}`;
const ACM_CERT_ARN =
  'arn:aws:acm:us-east-1:618246572188:certificate/bbf76ebd-498e-4bae-b85a-7df1e6f764ef';
const HOSTED_ZONE_ID = 'Z1089WFICFNFEM';
export class FrontEndStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, 'Optimus-fe', {
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

    const certificate = Certificate.fromCertificateArn(
      this,
      'sujanashah.comCert',
      ACM_CERT_ARN
    );

    const distribution = new Distribution(this, 'optimus-fe', {
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

    const hostedZone = HostedZone.fromHostedZoneAttributes(
      this,
      'Sujanshah.comZone',
      {
        zoneName: DOMAIN_NAME,
        hostedZoneId: HOSTED_ZONE_ID,
      }
    );

    const cnameRecord = new CnameRecord(this, 'optimusCname', {
      zone: hostedZone,
      recordName: CNAME,
      domainName: distribution.distributionDomainName,
    });

    cnameRecord.node.addDependency(distribution);
  }
}
