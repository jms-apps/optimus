/* eslint-disable jest/expect-expect */
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { FrontEndStack } from './front-end-stack';
import { CoreStack } from '../core/core-stack';

describe('FrontEndStack', () => {
  let template: cdk.assertions.Template;

  beforeAll(() => {
    const environment = 'test-';
    const app = new cdk.App();
    const coreStack = new CoreStack(app, `${environment}CoreStack`, {
      environment,
    });
    const stack = new FrontEndStack(app, 'FrontEndStack', {
      environment,
      hostedZone: coreStack.hostedZone,
      certificate: coreStack.certificate,
      DOMAIN_NAME: coreStack.DOMAIN_NAME,
    });
    template = Template.fromStack(stack);
  });

  it('should create s3 bucket without public access', () => {
    template.hasResourceProperties('AWS::S3::Bucket', {
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
      },
    });
  });

  it('should create cloud front distribution that points to env-optimus.sujanashah.com and points to index.html by default and when 404 so that react-router works', () => {
    template.hasResourceProperties('AWS::CloudFront::Distribution', {
      DistributionConfig: {
        Aliases: ['test-optimus.sujanashah.com'],
        CustomErrorResponses: [
          {
            ErrorCode: 404,
            ResponseCode: 404,
            ResponsePagePath: '/index.html',
          },
        ],
        DefaultRootObject: 'index.html',
      },
    });
  });

  it('should create cname record for env-optimus.sujanashah.com that points to cloudfront distribution created', () => {
    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'test-optimus.sujanashah.com.',
      ResourceRecords: [
        {
          'Fn::GetAtt': ['testoptimusfe71320C1D', 'DomainName'],
        },
      ],
    });
  });
});
