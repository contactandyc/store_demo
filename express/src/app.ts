import express from 'express';
import merchantRoutes from './routes/merchants';
import userRoutes from './routes/users';
import paymentMethodRoutes from './routes/payment_methods';
import productRoutes from './routes/products';
import swaggerUi from 'swagger-ui-express';

import fs from 'fs';
import path from 'path';
import YAML from 'js-yaml';

const yamlPath = path.join(__dirname, './swagger.yaml');
const swaggerDocument = YAML.load(fs.readFileSync(yamlPath, 'utf8')) as Record<string, unknown>;

const app = express();
app.use(express.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api', merchantRoutes);
app.use('/api', userRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', productRoutes);

export default app;