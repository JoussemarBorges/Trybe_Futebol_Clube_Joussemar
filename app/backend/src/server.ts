import { App } from './app';
import 'dotenv/config';

// Initial COmmit
const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);
