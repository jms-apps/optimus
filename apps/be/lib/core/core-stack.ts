import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import { UserPool, VerificationEmailStyle } from 'aws-cdk-lib/aws-cognito';
import path = require('path');

export class CoreStack extends cdk.Stack {
  public api: cdk.aws_appsync.GraphqlApi;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    this.api = new appsync.GraphqlApi(this, 'OptimusGraphql', {
      name: 'optimusGraphql',
      definition: appsync.Definition.fromFile(
        path.join(__dirname, '../schema.graphql')
      ),
      xrayEnabled: true,
    });
  }
}
