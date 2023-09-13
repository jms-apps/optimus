import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CoreStack } from './core-stack';

describe('CoreStack', () => {
  let template: cdk.assertions.Template;

  beforeAll(() => {
    const app = new cdk.App();
    const stack = new CoreStack(app, 'CoreStack', { environment: 'test-' });
    template = Template.fromStack(stack);
  });

  it('should create userpool', () => {
    template.hasResourceProperties('AWS::Cognito::UserPool', {
      UserPoolName: 'test-optimus-userpool',
    });
  });

  it('should create graphql api that is accessible by env-api.sujanashah.com', () => {
    template.hasResourceProperties('AWS::AppSync::GraphQLApi', {
      AuthenticationType: 'API_KEY',
    });
    template.hasResourceProperties('AWS::AppSync::DomainName', {
      DomainName: 'test-api.sujanashah.com',
    });
  });

  it('should create cname record that points to graphql api created', () => {
    template.hasResourceProperties('AWS::Route53::RecordSet', {
      Name: 'test-api.sujanashah.com.',
      ResourceRecords: [
        {
          'Fn::GetAtt': [
            'testOptimusGraphqlDomainName19C71408',
            'AppSyncDomainName',
          ],
        },
      ],
    });
  });
});
