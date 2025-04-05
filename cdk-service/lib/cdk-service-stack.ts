import * as cdk from 'aws-cdk-lib';
import { Duration } from 'aws-cdk-lib';
import {
  Code,
  Function,
  FunctionUrlAuthType,
  HttpMethod,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { config } from 'dotenv';

config();

export class CdkServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const environment = {};

    const cartApiLambda = new Function(this, 'cartApiLambdaFunction', {
      runtime: Runtime.NODEJS_22_X,
      code: Code.fromAsset('../dist/'),
      handler: 'lambda.handler',
      timeout: Duration.seconds(5),
      environment,
    });

    cartApiLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
        allowedMethods: [HttpMethod.ALL],
        allowedHeaders: ['*'],
      },
    });
  }
}
