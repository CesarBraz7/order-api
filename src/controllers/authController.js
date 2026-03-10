import { loginService } from '../services/authService.js';

export const login = (req, res) => {
  try {
    const { username, password } = req.body;
    const token = loginService(username, password);
    
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};