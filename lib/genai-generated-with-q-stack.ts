import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import * as nodeJsLambda from 'aws-cdk-lib/aws-lambda-nodejs';

export class GenaiGeneratedWithQStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create a Lambda function to handle the events route
    const eventsHandler = new nodeJsLambda.NodejsFunction(this, 'EventsHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, 'lambdas/events-handler.ts'),
      bundling: {
        minify: true,
        externalModules: ['aws-sdk'],
      },
      environment: {
        // Add environment variables if needed
        NODE_ENV: 'production',
      },
    });

    // Create the API Gateway
    const api = new apigateway.RestApi(this, 'EventsApi', {
      restApiName: 'Events Service',
      description: 'API for retrieving event information',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Add the events resource and GET method
    const events = api.root.addResource('events');
    events.addMethod('GET', new apigateway.LambdaIntegration(eventsHandler));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the Events API',
    });
  }
}
