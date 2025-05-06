import { handler } from '../lib/lambdas/events-handler';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Events Handler Lambda', () => {
  it('returns mock events data with 200 status code', async () => {
    // Create a mock API Gateway event
    const mockEvent = {} as APIGatewayProxyEvent;
    
    // Call the handler with the mock event
    const result = await handler(mockEvent);
    
    // Verify the response
    expect(result.statusCode).toBe(200);
    expect(result.headers).toEqual({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    });
    
    // Parse the response body
    const responseBody = JSON.parse(result.body);
    
    // Verify the events array exists and contains the expected data
    expect(responseBody).toHaveProperty('events');
    expect(Array.isArray(responseBody.events)).toBeTruthy();
    expect(responseBody.events.length).toBeGreaterThan(0);
    
    // Check structure of the first event
    const firstEvent = responseBody.events[0];
    expect(firstEvent).toHaveProperty('id');
    expect(firstEvent).toHaveProperty('name');
    expect(firstEvent).toHaveProperty('date');
    expect(firstEvent).toHaveProperty('location');
    expect(firstEvent).toHaveProperty('description');
  });

  it('handles errors correctly', async () => {
    // Mock implementation to force an error
    const mockEvent = {
      // Create an object that will cause an error when accessed
      get body() {
        throw new Error('Simulated error');
      }
    } as unknown as APIGatewayProxyEvent;
    
    // Spy on console.error to verify it's called
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    try {
      const result = await handler(mockEvent);
      
      // Check that we return a 500 status with error message
      expect(result.statusCode).toBe(500);
      expect(result.headers).toEqual({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      });
      
      const responseBody = JSON.parse(result.body);
      expect(responseBody).toHaveProperty('message', 'Error fetching events');
      
      // Verify console.error was called
      expect(consoleErrorSpy).toHaveBeenCalled();
    } finally {
      // Restore the original console.error
      consoleErrorSpy.mockRestore();
    }
  });
});