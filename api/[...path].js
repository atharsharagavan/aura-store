import app from '../server/app.js';
import { connectMongo } from '../server/mongo.js';

export default async function handler(req, res) {
  try {
    await connectMongo();
    return app(req, res);
  } catch (error) {
    console.error('API request failed:', error.message);
    return res.status(503).json({ message: 'The store API is unavailable until its database is configured.' });
  }
}
