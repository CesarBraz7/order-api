import { Schema, model } from 'mongoose';

const itemSchema = new Schema({
  productId: { type: Number, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [itemSchema]
}, {
  versionKey: false
});

export default model('Order', orderSchema);