import Order from '../models/Order.js';
import { mapOrderToDatabase } from '../utils/orderMapper.js';

export const createOrderService = async (bodyData) => {
  const orderData = mapOrderToDatabase(bodyData);

  // Verifica duplicidade antes de inserir, pois orderId é unique no schema
  const existingOrder = await Order.findOne({ orderId: orderData.orderId });
  if (existingOrder) throw new Error('Pedido já cadastrado');
  
  return await Order.create(orderData);
};

export const getOrderService = async (orderId) => await Order.findOne({ orderId });

export const listOrdersService = async () => await Order.find();

export const updateOrderService = async (orderId, bodyData) => {
  const updateData = mapOrderToDatabase(bodyData);
  // { new: true } retorna o documento já atualizado ao invés do original
  return await Order.findOneAndUpdate({ orderId }, updateData, { new: true });
};

export const deleteOrderService = async (orderId) => await Order.findOneAndDelete({ orderId });