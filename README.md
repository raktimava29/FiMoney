
# Documentation
- Base URL: `<http://localhost:5000/>`

- The code of the User Authentication and Product Managment are each split in 3 parts.

- Models, Routers and Controllers.

## User Authentication

####   POST `/api/user/register`

- Request
```json
{
  "username": "puja",
  "password": "mypassword"
}
```
- Response
```json
{
  "_id": "user_id",
  "username": "puja",
  "token": "jwt_token"
}
```
- Possible Error
  
`
400 Bad Request — Missing fields or user already exists.
`

####   POST `/api/user/login`

- Request
```json
{
  "username": "puja",
  "password": "mypassword"
}
```
- Response
```json
{
  "_id": "user_id",
  "username": "puja",
  "token": "jwt_token"
}
```

- Possible Error
  
`
401 Unauthorized — Invalid username or password.
`
## Product Managment

####   POST `/api/pro/products`

- Request
```json
{
  "name": "Phone",
  "type": "Electronics",
  "sku": "PHN-001",
  "image_url": "https://example.com/phone.jpg",
  "description": "Latest Phone",
  "quantity": 5,
  "price": 999.99
}

```
- Response
```json
{
  "product_id": "product_id",
  "message": "Product created successfully"
}
```
- Possible Error
  
`
400 Bad Request — Missing required fields.
`
####   POST `/api/pro/products/:id/quantity`
- id of the product i.e. here the id of Phone created above.
- Request
```json
{
  "quantity": 20
}

```
- Response
```json
{
  "_id": "product_id",
  "name": "Phone",
  "quantity": 20,
  ...
}

```
- Possible Error

`
400 Bad Request — Quantity not provided.
`

`
404 Not Found — Product not found
`
####   GET `/api/pro/products`
- Response
```json
[
  {
    "_id": "product_id_1",
    "name": "Product 1",
    "quantity": 10,
    ...
  },
  {
    "_id": "product_id_2",
    "name": "Product 2",
    "quantity": 5,
    ...
  }
]

```

## Installation

```bash
git clone https://github.com/raktimava29/FiMoney.git
npm install
npm start
```
Another Terminal
```bash
cd front-end
npm install
npm run dev
```
#### ENV File
```
MONGO_URI=mongodb_self_uri
JWT_SECRET=secret
```
    
