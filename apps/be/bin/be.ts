#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
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
