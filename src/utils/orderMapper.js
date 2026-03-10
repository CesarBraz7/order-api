export const mapOrderToDatabase = (requestBody) => {
  return {
    orderId: requestBody.numeroPedido,
    value: requestBody.valorTotal,
    creationDate: requestBody.dataCriacao,
    items: requestBody.items.map(item => ({
      productId: Number(item.idItem), // converte pra número
      quantity: item.quantidadeItem,
      price: item.valorItem
    }))
  };
};