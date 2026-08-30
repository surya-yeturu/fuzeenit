import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env');

dotenv.config({ path: envPath });

if (!process.env.MONGODB_URI) {
  console.error(`MONGODB_URI is not set. Expected env file at: ${envPath}`);
}

export default envPath;
