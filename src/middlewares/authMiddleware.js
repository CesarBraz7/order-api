import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token não fornecido.' });
  }

  try {
    // Remove o prefixo "Bearer " para extrair apenas o token JWT
    const tokenPuro = token.replace('Bearer ', '');
    const decoded = jwt.verify(tokenPuro, process.env.JWT_SECRET);
    req.user = decoded; // Disponibiliza os dados do usuário para as próximas rotas
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};