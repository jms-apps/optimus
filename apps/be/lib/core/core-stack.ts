import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { UserPool, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import path = require('path');
import { CnameRecord, HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const ACM_CERT_ARN =
  'arn:aws:acm:us-east-1:618246572188:certificate/bbf76ebd-498e-4bae-b85a-7df1e6f764ef';
const HOSTED_ZONE_ID = 'Z1089WFICFNFEM';
export class CoreStack extends cdk.Stack {
  public DOMAIN_NAME = 'sujanashah.com';
  public api: cdk.aws_appsync.GraphqlApi;
  public hostedZone: cdk.aws_route53.IHostedZone;
  public certificate: cdk.aws_certificatemanager.ICertificate;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const CNAME = `api.${this.DOMAIN_NAME}`;

    new UserPool(this, 'optimusUserPool', {
      userPoolName: 'optimus-userpool',
      signInCaseSensitive: false, // case insensitive is preferred in most situations
      selfSignUpEnabled: true,
      userVerification: {
        emailSubject: 'Verify your email for our awesome app!',
        emailBody:
          'Thanks for signing up to our awesome app! Your verification code is {####}',
        emailStyle: VerificationEmailStyle.CODE,
        smsMessage:
          'Thanks for signing up to our awesome app! Your verification code is {####}',
      },
      signInAliases: {
        username: true,
        email: true,
      },
    });

    this.certificate = Certificate.fromCertificateArn(
      this,
      'sujanashah.comCert',
      ACM_CERT_ARN
    );

    this.api = new appsync.GraphqlApi(this, 'OptimusGraphql', {
      name: 'optimusGraphql',
      definition: appsync.Definition.fromFile(
        path.join(__dirname, '../schema.graphql')
      ),
      xrayEnabled: true,
      domainName: {
        certificate: this.certificate,
        domainName: CNAME,
      },
    });

    this.hostedZone = HostedZone.fromHostedZoneAttributes(
      this,
      `Sujanashah.comZone`,
      {
        hostedZoneId: HOSTED_ZONE_ID,
        zoneName: this.DOMAIN_NAME,
      }
    );

    // create a cname to the appsync domain. will map to something like xxxx.cloudfront.net
    new CnameRecord(this, `optimusApiRecord`, {
      recordName: CNAME,
      zone: this.hostedZone,
      domainName: this.api.appSyncDomainName,
    });
  }
}
