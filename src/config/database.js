import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI);
    console.log('conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;