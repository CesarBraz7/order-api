import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/database.js';
import orderRoutes from './src/routes/orderRoutes.js';

const app = express();
app.use(cors());
app.use(json());

await connectDB();

app.use('/order', orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});