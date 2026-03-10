import Order from '../models/Order.js';
import { mapOrderToDatabase } from '../utils/orderMapper.js';

export const createOrderService = async (bodyData) => {
  const orderData = mapOrderToDatabase(bodyData);
  
  const existingOrder = await Order.findOne({ orderId: orderData.orderId });
  if (existingOrder) throw new Error('Pedido já cadastrado');
  
  return await Order.create(orderData);
};

export const getOrderService = async (orderId) => await Order.findOne({ orderId });