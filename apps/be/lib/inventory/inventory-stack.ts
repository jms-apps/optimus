import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

interface GraphqlApiProps extends cdk.StackProps {
  environment: string;
  apiId: string;
}

export class InventoryStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: GraphqlApiProps) {
    super(scope, id, props);

    const { apiId, environment } = props;

    const inventoryTable = new dynamodb.Table(this, `${environment}Inventory`, {
      partitionKey: {
        name: 'sku',
        type: dynamodb.AttributeType.STRING,
      },
    });

    const api = appsync.GraphqlApi.fromGraphqlApiAttributes(
      this,
      'InventoryFunctionApi',
      {
        graphqlApiId: apiId,
      }
    );

    const inventoryDataSource = api.addDynamoDbDataSource(
      'inventoryDataSource',
      inventoryTable
    );

    // Resolver for the Query "getDemos" that scans the DynamoDb table and returns the entire list.
    // Resolver Mapping Template Reference:
    // https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html
    inventoryDataSource.createResolver(
      `${environment}QueryGetInventoryResolver`,
      {
        typeName: 'Query',
        fieldName: 'getInventory',
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
      }
    );

    // Resolver for the Mutation "addDemo" that puts the item into the DynamoDb table.
    inventoryDataSource.createResolver(
      `${environment}MutationAddInventoryResolver`,
      {
        typeName: 'Mutation',
        fieldName: 'addInventory',
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
          appsync.PrimaryKey.partition('sku').auto(),
          appsync.Values.projecting('input')
        ),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
      }
    );

    //To enable DynamoDB read consistency with the `MappingTemplate`:
    // inventoryDataSource.createResolver('QueryGetInventoryConsistentResolver', {
    //   typeName: 'Query',
    //   fieldName: 'getInventoryConsistent',
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(true),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    // });
  }
}
