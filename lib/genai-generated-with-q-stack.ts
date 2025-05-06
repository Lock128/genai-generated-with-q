import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';

export class GenaiGeneratedWithQStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the Lambda function for the events API
    const eventsHandler = new nodejs.NodejsFunction(this, 'EventsHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, 'lambdas/events-handler.ts'),
      handler: 'handler',
      bundling: {
        minify: true,
        // Bundle everything including AWS SDK to reduce cold start times
        externalModules: [],
        nodeModules: ['aws-sdk'],
        sourcemap: true,
        forceDockerBundling: false,
      },
    });

    // Create API Gateway REST API
    const api = new apigateway.RestApi(this, 'EventsApi', {
      restApiName: 'RSVP Events Service',
      description: 'This service provides RSVP event information',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      },
    });

    // Add events resource and GET method to API Gateway
    const events = api.root.addResource('events');
    events.addMethod('GET', new apigateway.LambdaIntegration(eventsHandler));

    // Output the API URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'The URL of the API Gateway',
    });
  }
}
