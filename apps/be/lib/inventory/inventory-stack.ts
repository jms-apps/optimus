import { StackProps, Stack } from 'aws-cdk-lib';
import { Architecture } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { GraphqlApi } from 'aws-cdk-lib/aws-appsync';
import { Table, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'path';

interface GraphqlApiProps extends StackProps {
  environment: string;
  apiId: string;
}

export class InventoryStack extends Stack {
  constructor(scope: Construct, id: string, props: GraphqlApiProps) {
    super(scope, id, props);

    const { apiId, environment } = props;

    const inventoryTable = new Table(this, `${environment}Inventory`, {
      partitionKey: {
        name: 'sku',
        type: AttributeType.STRING,
      },
    });

    const api = GraphqlApi.fromGraphqlApiAttributes(
      this,
      'InventoryFunctionApi',
      {
        graphqlApiId: apiId,
      }
    );

    // const inventoryDataSource = api.addDynamoDbDataSource(
    //   'inventoryDataSource',
    //   inventoryTable
    // );

    // // Resolver for the Query "getDemos" that scans the DynamoDb table and returns the entire list.
    // // Resolver Mapping Template Reference:
    // // https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html
    // inventoryDataSource.createResolver(
    //   `${environment}QueryGetInventoryResolver`,
    //   {
    //     typeName: 'Query',
    //     fieldName: 'getInventory',
    //     requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
    //     responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    //   }
    // );

    // // Resolver for the Mutation "addDemo" that puts the item into the DynamoDb table.
    // inventoryDataSource.createResolver(
    //   `${environment}MutationAddInventoryResolver`,
    //   {
    //     typeName: 'Mutation',
    //     fieldName: 'addInventory',
    //     requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
    //       appsync.PrimaryKey.partition('sku').auto(),
    //       appsync.Values.projecting('input')
    //     ),
    //     responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem(),
    //   }
    // );

    const environmentVars = {
      inventoryTableName: inventoryTable.tableName,
    };

    const addInventoryLambda = new NodejsFunction(
      this,
      'AddInventoryFunction',
      {
        entry: `${join(__dirname, 'lambda/add-inventory.ts')}`,
        handler: 'handler',
        architecture: Architecture.ARM_64,
        environment: environmentVars,
      }
    );

    const addInventoryDataSource = api.addLambdaDataSource(
      'addInventoryDataSource',
      addInventoryLambda
    );

    addInventoryDataSource.createResolver(
      `${this.environment}addInventoryResolver`,
      {
        typeName: 'Mutation',
        fieldName: 'addInventory',
      }
    );

    inventoryTable.grantReadWriteData(addInventoryLambda);

    //To enable DynamoDB read consistency with the `MappingTemplate`:
    // inventoryDataSource.createResolver('QueryGetInventoryConsistentResolver', {
    //   typeName: 'Query',
    //   fieldName: 'getInventoryConsistent',
    //   requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(true),
    //   responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList(),
    // });
  }
}
