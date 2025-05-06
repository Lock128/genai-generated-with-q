import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    name: 'AWS User Group Meetup - January',
    date: '2024-01-15',
    location: 'Online',
    description: 'Monthly AWS user group meetup discussing latest AWS services and features.'
  },
  {
    id: '2',
    name: 'Cloud Computing Workshop',
    date: '2024-02-10',
    location: 'Tech Hub, Downtown',
    description: 'Hands-on workshop covering cloud computing fundamentals and AWS.'
  },
  {
    id: '3',
    name: 'DevOps Community Gathering',
    date: '2024-03-05',
    location: 'Conference Center',
    description: 'Networking event for DevOps professionals to share best practices.'
  }
];

/**
 * Lambda function to handle requests to the events API
 * @param event The API Gateway event
 * @returns API Gateway proxy result with events data
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // For now, we're returning mock data as specified in the requirements
    // In the future, this would be replaced with actual database queries
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // For CORS support
      },
      body: JSON.stringify({
        events: mockEvents
      })
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Error fetching events'
      })
    };
  }
};