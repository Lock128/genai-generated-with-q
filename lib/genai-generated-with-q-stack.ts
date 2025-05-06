import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class GenaiGeneratedWithQStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Lambda function for the events API
    const eventsHandler = new NodejsFunction(this, 'EventsHandler', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'handler',
      entry: path.join(__dirname, 'lambdas/events-handler.ts'),
      memorySize: 256,
      timeout: cdk.Duration.seconds(30),
    });

    // Create an API Gateway REST API
    const api = new apigw.RestApi(this, 'EventsApi', {
      restApiName: 'Events Service',
      description: 'API for accessing event information',
      deployOptions: {
        stageName: 'prod',
      },
      // Enable CORS
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
      },
    });

    // Add 'events' resource and integrate with Lambda
    const eventsResource = api.root.addResource('events');
    eventsResource.addMethod('GET', new apigw.LambdaIntegration(eventsHandler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    }));

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ApiUrl', {
      value: api.url,
      description: 'URL of the API Gateway',
    });
  }
}
