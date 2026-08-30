import './config/env.js';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

import courseRoutes from './routes/courseRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import errorHandler, { notFound } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use('/api', apiRateLimiter);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'FUZEN IT API is running' });
});

app.use('/api/courses', courseRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/contact', contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
