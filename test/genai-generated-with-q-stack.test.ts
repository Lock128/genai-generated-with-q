import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { GenaiGeneratedWithQStack } from '../lib/genai-generated-with-q-stack';

describe('GenaiGeneratedWithQStack', () => {
  const app = new cdk.App();
  const stack = new GenaiGeneratedWithQStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);

  test('API Gateway and Lambda Resources Created', () => {
    // Verify API Gateway is created
    template.resourceCountIs('AWS::ApiGateway::RestApi', 1);
    template.resourceCountIs('AWS::ApiGateway::Method', 1);
    template.resourceCountIs('AWS::ApiGateway::Resource', 1);
    
    // Verify Lambda function is created
    template.resourceCountIs('AWS::Lambda::Function', 1);
    
    // Check Lambda integration with API Gateway
    template.hasResourceProperties('AWS::ApiGateway::Method', {
      HttpMethod: 'GET',
      ResourceId: {
        Ref: expect.stringMatching(/^EventsApi.*/)
      },
      RestApiId: {
        Ref: expect.stringMatching(/^EventsApi.*/)
      },
      Integration: {
        IntegrationHttpMethod: 'POST',
        Type: 'AWS_PROXY',
        Uri: {
          'Fn::Join': expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({
              'Fn::GetAtt': expect.arrayContaining([
                expect.stringMatching(/^EventsHandler.*/),
                'Arn'
              ])
            })
          ])
        }
      }
    });
  });

  test('Stack Snapshot', () => {
    // Create a snapshot of the entire CloudFormation template
    // This will fail if the template changes in unexpected ways
    // To update the snapshot, run: jest --updateSnapshot
    expect(template.toJSON()).toMatchSnapshot();
  });
});