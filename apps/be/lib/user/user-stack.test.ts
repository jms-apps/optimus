import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CoreStack } from '../core/core-stack';
import { UserStack } from './user-stack';

describe('FrontEndStack', () => {
  let template: cdk.assertions.Template;

  beforeAll(() => {
    const environment = 'test-';
    const app = new cdk.App();
    const coreStack = new CoreStack(app, `${environment}CoreStack`, {
      environment,
    });
    const stack = new UserStack(app, 'FrontEndStack', {
      environment,
      apiId: coreStack.apiId,
    });
    template = Template.fromStack(stack);
  });

  it('should create userpool', () => {
    template.hasResourceProperties('AWS::Cognito::UserPool', {
      UserPoolName: 'test-optimus-userpool',
    });
  });

  it('should create userpool client assigned to same user pool', () => {
    template.hasResourceProperties('AWS::Cognito::UserPoolClient', {
      AllowedOAuthFlows: ['implicit', 'code'],
    });
  });

  it('should create login lambda that is available as Mutation{login}', () => {
    template.hasResourceProperties('AWS::AppSync::Resolver', {
      FieldName: 'login',
      TypeName: 'Mutation',
    });
  });

  it('should create register lambda that is available as Mutation{register}', () => {
    template.hasResourceProperties('AWS::AppSync::Resolver', {
      FieldName: 'register',
      TypeName: 'Mutation',
    });
  });

  it('should create verify email lambda that is available as Mutation{verifyEmail}', () => {
    template.hasResourceProperties('AWS::AppSync::Resolver', {
      FieldName: 'verifyEmail',
      TypeName: 'Mutation',
    });
  });
});
