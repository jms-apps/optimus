import { Stack, StackProps, aws_lambda } from 'aws-cdk-lib';
import {
  UserPool,
  UserPoolClient,
  VerificationEmailStyle,
} from 'aws-cdk-lib/aws-cognito';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as path from 'path';

interface UserStackProps extends StackProps {
  apiId: string;
  environment: string;
}

export class UserStack extends Stack {
  userPoolClientId: string;

  constructor(scope: Construct, id: string, props: UserStackProps) {
    super(scope, id, props);

    const { apiId, environment } = props;

    const userPool = new UserPool(this, `${environment}optimusUserPool`, {
      userPoolName: `${environment}optimus-userpool`,
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
        email: true,
      },
    });

    const userPoolClient = new UserPoolClient(
      this,
      `${environment}optimusUserPoolClient`,
      {
        userPool,
        authFlows: {
          userPassword: true, // Enable username/password authentication
          userSrp: true, // Enable Secure Remote Password (SRP) authentication
        },
        // Add more App Client settings as needed
      }
    );

    this.userPoolClientId = userPoolClient.userPoolClientId;

    const environmentVars = {
      userPoolClientId: userPoolClient.userPoolClientId,
    };
    const api = appsync.GraphqlApi.fromGraphqlApiAttributes(
      this,
      'LoginFunctionApi',
      {
        graphqlApiId: apiId,
      }
    );

    const loginLambda = new NodejsFunction(this, 'LoginFunction', {
      entry: `${path.join(__dirname, 'lambda/login.ts')}`,
      handler: 'handler',
      architecture: aws_lambda.Architecture.ARM_64,
      environment: environmentVars,
    });

    const loginDataSource = api.addLambdaDataSource(
      'loginDataSource',
      loginLambda
    );

    loginDataSource.createResolver(`${this.environment}loginResolver`, {
      typeName: 'Mutation',
      fieldName: 'login',
    });

    const registerLambda = new NodejsFunction(this, 'registerFunction', {
      entry: `${path.join(__dirname, 'lambda/register.ts')}`,
      handler: 'handler',
      architecture: aws_lambda.Architecture.ARM_64,
      environment: environmentVars,
    });

    const registerDataSource = api.addLambdaDataSource(
      'registerDataSource',
      registerLambda
    );

    registerDataSource.createResolver(`${this.environment}registerResolver`, {
      typeName: 'Mutation',
      fieldName: 'register',
    });

    const verifyEmailLambda = new NodejsFunction(this, 'verifyEmailFunction', {
      entry: `${path.join(__dirname, 'lambda/verify-email.ts')}`,
      handler: 'handler',
      architecture: aws_lambda.Architecture.ARM_64,
      environment: environmentVars,
    });

    const verifyEmailDataSource = api.addLambdaDataSource(
      'verifyEmailDataSource',
      verifyEmailLambda
    );

    verifyEmailDataSource.createResolver(
      `${this.environment}verifyEmailResolver`,
      {
        typeName: 'Mutation',
        fieldName: 'verifyEmail',
      }
    );
  }
}
