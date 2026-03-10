import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Order API',
      version: '1.0.0',
      description: 'API para gerenciamento de pedidos com autenticação JWT',
      contact: {
        name: 'CesarBraz7',
        url: 'https://github.com/CesarBraz7/order-api',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de Desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no login',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: {
              type: 'string',
              example: 'admin',
              description: 'Nome de usuário',
            },
            password: {
              type: 'string',
              example: 'admin',
              description: 'Senha do usuário',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'Token JWT para autenticação',
            },
          },
        },
        Item: {
          type: 'object',
          required: ['idItem', 'quantidadeItem', 'valorItem'],
          properties: {
            idItem: {
              type: 'string',
              example: '101',
              description: 'ID do produto',
            },
            quantidadeItem: {
              type: 'integer',
              example: 2,
              description: 'Quantidade do item',
            },
            valorItem: {
              type: 'number',
              format: 'float',
              example: 29.90,
              description: 'Preço unitário do item',
            },
          },
        },
        OrderRequest: {
          type: 'object',
          required: ['numeroPedido', 'valorTotal', 'dataCriacao', 'items'],
          properties: {
            numeroPedido: {
              type: 'string',
              example: 'PED-001',
              description: 'Número único do pedido',
            },
            valorTotal: {
              type: 'number',
              format: 'float',
              example: 59.80,
              description: 'Valor total do pedido',
            },
            dataCriacao: {
              type: 'string',
              format: 'date-time',
              example: '2026-03-09T10:30:00.000Z',
              description: 'Data de criação do pedido',
            },
            items: {
              type: 'array',
              description: 'Lista de itens do pedido',
              items: {
                $ref: '#/components/schemas/Item',
              },
            },
          },
        },
        OrderResponse: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '65f1a2b3c4d5e6f7a8b9c0d1',
              description: 'ID interno do MongoDB',
            },
            orderId: {
              type: 'string',
              example: 'PED-001',
              description: 'Número único do pedido',
            },
            value: {
              type: 'number',
              format: 'float',
              example: 59.80,
              description: 'Valor total do pedido',
            },
            creationDate: {
              type: 'string',
              format: 'date-time',
              example: '2026-03-09T10:30:00.000Z',
              description: 'Data de criação do pedido',
            },
            items: {
              type: 'array',
              description: 'Lista de itens do pedido',
              items: {
                $ref: '#/components/schemas/ItemResponse',
              },
            },
          },
        },
        ItemResponse: {
          type: 'object',
          properties: {
            productId: {
              type: 'integer',
              example: 101,
              description: 'ID do produto',
            },
            quantity: {
              type: 'integer',
              example: 2,
              description: 'Quantidade do item',
            },
            price: {
              type: 'number',
              format: 'float',
              example: 29.90,
              description: 'Preço unitário do item',
            },
            _id: {
              type: 'string',
              example: '65f1a2b3c4d5e6f7a8b9c0d2',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
            details: {
              type: 'string',
              description: 'Detalhes adicionais do erro',
            },
          },
        },
        DeleteResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Pedido deletado com sucesso!',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Order API - Documentação',
  }));

  // Endpoint para obter o JSON do Swagger
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
