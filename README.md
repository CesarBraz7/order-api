# 📦 Order API

API RESTful para gerenciamento de pedidos, desenvolvida com **Node.js**, **Express** e **MongoDB**.

## 🛠️ Tecnologias

- **Node.js** (ES Modules)
- **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** (JSON Web Token) para autenticação
- **Swagger** para documentação interativa

## 📁 Estrutura do Projeto

```
order-api/
├── src/
│   ├── config/
│   │   ├── database.js        # Conexão com o MongoDB
│   │   └── swagger.js         # Configuração do Swagger
│   ├── controllers/
│   │   ├── authController.js   # Controller de autenticação
│   │   └── orderController.js  # Controller de pedidos
│   ├── middlewares/
│   │   └── authMiddleware.js   # Middleware de verificação JWT
│   ├── models/
│   │   └── Order.js            # Schema do pedido (Mongoose)
│   ├── routes/
│   │   ├── authRoute.js        # Rotas de autenticação
│   │   └── orderRoute.js       # Rotas de pedidos
│   ├── services/
│   │   ├── authService.js      # Lógica de autenticação
│   │   └── orderService.js     # Lógica de negócio dos pedidos
│   ├── utils/
│   │   └── orderMapper.js      # Mapeamento request → banco
│   └── server.js               # Ponto de entrada da aplicação
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18+)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/CesarBraz7/order-api.git
cd order-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente (as credenciais de teste já estão preenchidas)
cp .env.example .env
```

### Variáveis de Ambiente

O arquivo `.env.example` já contém as credenciais de um cluster MongoDB Atlas criado exclusivamente para este desafio. Basta renomear/copiar para `.env` e o projeto estará pronto para rodar.

| Variável       | Descrição                              |
| -------------- | -------------------------------------- |
| `PORT`         | Porta do servidor (padrão: 3000)       |
| `MONGODB_URI`  | String de conexão com o MongoDB Atlas  |
| `JWT_SECRET`   | Chave secreta para assinar tokens JWT  |

> ⚠️ As credenciais foram criadas exclusivamente para este teste técnico.

### Executando

```bash
# Modo desenvolvimento (com hot-reload)
npm run dev
```

O servidor estará disponível em `http://localhost:3000`.

## 📖 Documentação da API

Com o servidor rodando, acesse a documentação interativa do Swagger:

**🔗 http://localhost:3000/api-docs**

---

### Autenticação

Todas as rotas de pedidos são protegidas com JWT. Para utilizá-las:

1. Faça login em `POST /auth/login` para obter o token
2. Inclua o token no header: `Authorization: Bearer <token>`

> No Swagger UI, clique no botão **Authorize** 🔓 e cole o token.

---

### Endpoints

#### 🔐 Auth

| Método | Rota           | Descrição                     |
| ------ | -------------- | ----------------------------- |
| POST   | `/auth/login`  | Realiza login e retorna o JWT |

**Credenciais de teste:**
```json
{
  "username": "admin",
  "password": "admin"
}
```

#### 📋 Pedidos (requer autenticação)

| Método | Rota               | Descrição                  |
| ------ | ------------------ | -------------------------- |
| GET    | `/order`           | Lista todos os pedidos     |
| POST   | `/order`           | Cria um novo pedido        |
| GET    | `/order/:orderId`  | Busca pedido por ID        |
| PUT    | `/order/:orderId`  | Atualiza um pedido         |
| DELETE | `/order/:orderId`  | Deleta um pedido           |

**Exemplo de corpo da requisição (POST/PUT):**

```json
{
  "numeroPedido": "PED-001",
  "valorTotal": 59.80,
  "dataCriacao": "2026-03-09T10:30:00.000Z",
  "items": [
    {
      "idItem": "101",
      "quantidadeItem": 2,
      "valorItem": 29.90
    }
  ]
}
```

> Os campos do request são mapeados automaticamente para o schema do banco:
> `numeroPedido` → `orderId` · `valorTotal` → `value` · `dataCriacao` → `creationDate`
