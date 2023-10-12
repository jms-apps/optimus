#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { BeStack } from '../lib/sample/sample-stack';
import { InventoryStack } from '../lib/inventory/inventory-stack';
import { CoreStack } from '../lib/core/core-stack';

import { FrontEndStack } from '../lib/front-end/front-end-stack';
import { UserStack } from '../lib/user/user-stack';

const environment = process.env.NODE_ENV || 'dev-';

const app = new cdk.App();
const coreStack = new CoreStack(app, `${environment}CoreStack`, {
  environment,
});

new UserStack(app, `${environment}UserStack`, {
  apiId: coreStack.apiId,
  environment,
});

new FrontEndStack(app, `${environment}FrontEndStack`, {
  environment,
  hostedZone: coreStack.hostedZone,
  certificate: coreStack.certificate,
  DOMAIN_NAME: coreStack.DOMAIN_NAME,
});
new InventoryStack(app, `${environment}InventoryStack`, {
  environment,
  apiId: coreStack.apiId,
  // userPoolClientId: userStack.userPoolClientId,
});

new BeStack(app, `${environment}BeStack`, {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */
  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },
  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
