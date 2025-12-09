import app from '../server.js';
import connectDB from '../backend/config/db.js';

// Export the Vercel serverless function handler
export default async function handler(request, response) {
  try {
    // Connect to database
    await connectDB();
    
    // Convert Vercel's request/response to Express's req/res
    // This allows our Express app to handle the request
    await new Promise((resolve, reject) => {
      // Call the Express app with the Vercel request/response
      app(request, response, (err) => {
        if (err) {
          reject(err);
        } else {
          // If the Express app didn't send a response, we need to do it
          if (!response.writableEnded) {
            response.status(404).send('Not Found');
          }
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Vercel API Handler Error:', error);
    if (!response.headersSent) {
      response.status(500).json({ 
        message: 'Internal Server Error', 
        error: process.env.NODE_ENV === 'development' ? error.message : {} 
      });
    }
  }
}