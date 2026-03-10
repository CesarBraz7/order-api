import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import { setupSwagger } from './config/swagger.js';
import orderRoutes from './routes/orderRoute.js';
import authRoutes from './routes/authRoute.js';

const app = express();
app.use(cors());
app.use(json());

await connectDB();

// Swagger registrado antes das rotas para garantir que /api-docs esteja acessível
setupSwagger(app);

app.use('/order', orderRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Documentação Swagger disponível em http://localhost:${PORT}/api-docs`);
});