import 'dotenv/config';
import app from './app.js';
import { connectMongo } from './mongo.js';

const port = process.env.PORT || 5000;
await connectMongo();
app.listen(port, () => console.log(`API running on port ${port}`));
