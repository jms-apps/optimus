import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import path = require('path');
import { CnameRecord, HostedZone } from 'aws-cdk-lib/aws-route53';
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager';

const ACM_CERT_ARN =
  'arn:aws:acm:us-east-1:618246572188:certificate/bbf76ebd-498e-4bae-b85a-7df1e6f764ef';
const HOSTED_ZONE_ID = 'Z1089WFICFNFEM';

interface CoreStackProps extends cdk.StackProps {
  environment: string;
}
export class CoreStack extends cdk.Stack {
  public DOMAIN_NAME = 'sujanashah.com';
  public api: cdk.aws_appsync.GraphqlApi;
  public hostedZone: cdk.aws_route53.IHostedZone;
  public certificate: cdk.aws_certificatemanager.ICertificate;

  constructor(scope: Construct, id: string, props: CoreStackProps) {
    super(scope, id, props);

    const { environment } = props;
    const CNAME = `${environment}api.${this.DOMAIN_NAME}`;

    this.certificate = Certificate.fromCertificateArn(
      this,
      'sujanashah.comCert',
      ACM_CERT_ARN
    );

    this.api = new appsync.GraphqlApi(this, `${environment}OptimusGraphql`, {
      name: `${environment}optimusGraphql`,
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
    new CnameRecord(this, `${environment}optimusApiRecord`, {
      recordName: CNAME,
      zone: this.hostedZone,
      domainName: this.api.appSyncDomainName,
    });
  }
}
