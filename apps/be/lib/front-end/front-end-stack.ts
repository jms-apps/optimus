import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import {
  BlockPublicAccess,
  Bucket,
  BucketAccessControl,
} from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Distribution, OriginAccessIdentity } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';

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

    new Distribution(this, 'optimus-fe', {
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new S3Origin(bucket, { originAccessIdentity }),
      },
    });
  }
}
