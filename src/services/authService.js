import jwt from 'jsonwebtoken';

export const loginService = (username, password) => {
  // Usuário e senha fixos apenas para demonstração no teste
  if (username === 'admin' && password === 'admin') {
    return jwt.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
  
  throw new Error('Credenciais inválidas.');
};