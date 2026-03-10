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

export const listOrders = async (req, res) => {
  try {
    const orders = await service.listOrdersService();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao listar.', details: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await service.updateOrderService(req.params.orderId, req.body);
    if (!updatedOrder) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar.', details: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await service.deleteOrderService(req.params.orderId);
    if (!deletedOrder) return res.status(404).json({ error: 'Pedido não encontrado.' });
    return res.status(200).json({ message: 'Pedido deletado com sucesso!' });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao deletar.', details: error.message });
  }
};