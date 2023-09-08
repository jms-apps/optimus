import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class BeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function
    const lambdaFunction = new NodejsFunction(this, 'MyLambdaFunction', {
      entry: `${path.join(__dirname, 'lambda')}/hello.ts`, // Path to your Lambda function code
      handler: 'handler', // The exported function name
      architecture: cdk.aws_lambda.Architecture.ARM_64,
    });

    // Optionally, add environment variables
    // lambdaFunction.addEnvironment('MY_ENV_VARIABLE', 'my-value');

    // Optionally, grant permissions to your Lambda function (e.g., access to other AWS resources)
    // For example, to allow Lambda to write to an S3 bucket:
    // lambdaFunction.addToRolePolicy(new iam.PolicyStatement({
    //   actions: ['s3:PutObject'],
    //   resources: ['arn:aws:s3:::my-bucket/*'],
    // }));
  }
}
