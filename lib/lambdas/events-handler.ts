import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    name: 'AWS User Group Meetup - January',
    date: '2024-01-15T18:00:00Z',
    location: 'Tech Hub Downtown',
    description: 'Monthly AWS user group meeting discussing serverless architectures',
    maxAttendees: 50,
    currentAttendees: 32
  },
  {
    id: '2',
    name: 'AWS User Group Meetup - February',
    date: '2024-02-12T18:00:00Z',
    location: 'Innovation Center',
    description: 'Monthly AWS user group meeting focusing on container services',
    maxAttendees: 50,
    currentAttendees: 18
  },
  {
    id: '3',
    name: 'Cloud Computing Workshop',
    date: '2024-03-05T09:00:00Z',
    location: 'Virtual',
    description: 'Hands-on workshop for cloud computing enthusiasts',
    maxAttendees: 100,
    currentAttendees: 45
  }
];

/**
 * Lambda function to handle requests for events
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // Returning all events (mock data for now)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      events: mockEvents
    })
  };
};