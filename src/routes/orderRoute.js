import { Router } from 'express';
import { createOrder, getOrder, deleteOrder, listOrders, updateOrder } from '../controllers/orderController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.use(verifyToken);

router.get('/', listOrders);
router.post('/', createOrder);
router.get('/:orderId', getOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);

export default router;