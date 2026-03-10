import * as service from '../services/orderService.js';

export const createOrder = async (req, res) => {
  try {
    const newOrder = await service.createOrderService(req.body);
    return res.status(201).json(newOrder);
  } catch (error) {
    if (error.message === 'Pedido já cadastrado') return res.status(400).json({ error: error.message });
    return res.status(500).json({ error: 'Erro ao criar pedido.', details: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await service.getOrderService(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pedido.', details: error.message });
  }
};