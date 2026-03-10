import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/database.js';

const app = express();
app.use(cors());
app.use(json());

await connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});