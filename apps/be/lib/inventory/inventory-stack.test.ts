import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { InventoryStack } from './inventory-stack';
import { CoreStack } from '../core/core-stack';

describe('FrontEndStack', () => {
  let template: cdk.assertions.Template;
  let coreStackTemplate: cdk.assertions.Template;

  beforeAll(() => {
    const environment = 'test-';
    const app = new cdk.App();
    const coreStack = new CoreStack(app, `${environment}CoreStack`, {
      environment,
    });
    const stack = new InventoryStack(app, 'FrontEndStack', {
      environment,
      api: coreStack.api,
    });
    template = Template.fromStack(stack);
    coreStackTemplate = Template.fromStack(coreStack);
  });

  it('should create dynamodb table for inventory', () => {
    template.hasResourceProperties('AWS::DynamoDB::Table', {
      KeySchema: [
        {
          AttributeName: 'sku',
          KeyType: 'HASH',
        },
      ],
    });
  });
  it('should create resolvers in core stack to add and get inventory', () => {
    coreStackTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: 'inventoryDataSource',
      FieldName: 'getInventory',
    });
    coreStackTemplate.hasResourceProperties('AWS::AppSync::Resolver', {
      DataSourceName: 'inventoryDataSource',
      FieldName: 'addInventory',
    });
  });
});
