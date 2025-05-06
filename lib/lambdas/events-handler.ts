import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    name: 'AWS User Group Meetup - Serverless',
    date: '2023-11-15T18:00:00Z',
    location: 'Tech Hub Downtown',
    description: 'Join us for a discussion about serverless architecture and best practices.'
  },
  {
    id: '2',
    name: 'AWS User Group Meetup - Container Services',
    date: '2023-12-10T18:00:00Z',
    location: 'Cloud Innovation Center',
    description: 'Learn about the latest in container orchestration with AWS ECS and EKS.'
  },
  {
    id: '3',
    name: 'New Year Tech Conference',
    date: '2024-01-20T09:00:00Z',
    location: 'Convention Center',
    description: 'Annual tech conference covering cloud technologies and more.'
  }
];

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Event received:', JSON.stringify(event));
  
  try {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // For CORS support
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        events: mockEvents
      })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
};