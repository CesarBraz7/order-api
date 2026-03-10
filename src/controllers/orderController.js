import Order from '../models/Order.js';
import { mapOrderToDatabase } from '../utils/orderMapper.js';

export const createOrder = async (req, res) => {
  try {
    const orderData = mapOrderToDatabase(req.body);

    const existingOrder = await Order.findOne({ orderId: orderData.orderId });
    if (existingOrder) {
      return res.status(400).json({ error: 'Pedido já cadastrado.' });
    }

    const newOrder = await Order.create(orderData);
    return res.status(201).json(newOrder);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao criar pedido.', details: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    return res.status(200).json(order);

  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar pedido.', details: error.message });
  }
};