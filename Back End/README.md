# Project Stride Backend

Backend API for the Project Stride e-commerce application. This server handles authentication, product listing, cart management, order placement, and admin operations such as product management, user blocking, and order tracking.

## Features

- User registration, login, and logout
- Cookie-based JWT authentication
- Public product listing with pagination and filtering
- Cart management for authenticated users
- Order placement and order history
- Admin login and dashboard
- Admin product create, update, and soft delete
- Admin user block/unblock
- Cloudinary image upload for product images

## Tech Stack

- Node.js
- Express
- MongoDB with Mongoose
- JWT authentication
- Joi validation
- Multer + Cloudinary for uploads

## Project Structure

```text
Back End/
|- config/
|- controllers/
|- middleware/
|- models/
|- routes/
|- utils/
|- validation/
`- server.js
```

## Environment Variables

Create a `.env` file in the project root and add:

```env
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3000
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

## Installation

```bash
npm install
```

## Run the Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

## Authentication Notes

- Login stores a JWT in an HTTP-only cookie named `token`
- Protected routes depend on that cookie being sent with the request
- Frontend requests should use credentials
- Admin-only routes require a logged-in user with `role: "admin"`

## API Base URL

```text
http://localhost:<PORT>/api
```

## Main API Routes

### Auth

Base route: `/api/auth`

- `POST /register` - Register a new user
- `POST /login` - Login user
- `DELETE /logout` - Logout user

Example register body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
```

### Products

Base route: `/api/products`

- `GET /` - Get all products
- `GET /:id` - Get single product

Supported query params:

- `page`
- `limit`
- `keyword`
- `brand`
- `category`

### Cart

Base route: `/api/cart`

- `POST /` - Add product to cart
- `GET /` - Get current user cart
- `PATCH /` - Update cart item quantity
- `DELETE /` - Remove item from cart

Example cart body:

```json
{
  "productId": "product_id_here",
  "size": 42,
  "quantity": 1
}
```

### Orders

Base route: `/api/order`

- `POST /` - Place order from cart items
- `GET /` - Get logged-in user orders

Example order body:

```json
{
  "address": {
    "name": "John Doe",
    "phone": "1234567890",
    "city": "Kochi",
    "state": "Kerala",
    "pincode": "682001",
    "addressLine": "Street address"
  },
  "payment": "COD"
}
```

### Admin

Base route: `/api/admin`

- `POST /adminlogin` - Admin login
- `GET /dashboard` - Dashboard stats
- `GET /users` - Get all users
- `PATCH /users/:id` - Block or unblock a user
- `GET /orders` - Get all orders
- `PATCH /orders/:id` - Update order status
- `GET /products` - Get all products for admin panel
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Soft delete product

## Product Upload Notes

Admin product create and update endpoints use `multipart/form-data`.

- Image field name: `image`
- Max file size: `3MB`
- Allowed formats: `jpg`, `jpeg`, `png`, `webp`

Example product fields:

- `brand`
- `name`
- `category`
- `price`
- `sizes`
- `description`
- `image`

## Data Models Overview

### User

- `username`
- `email`
- `password`
- `profileImg`
- `role`
- `isBlocked`
- `isDeleted`

### Product

- `brand`
- `name`
- `category`
- `price`
- `sizes`
- `description`
- `image`
- `isDeleted`

### Cart

- `userId`
- `productId`
- `size`
- `quantity`

### Order

- `userId`
- `products`
- `orderId`
- `totalPrice`
- `paymentMethod`
- `shippingDetails`
- `status`

## Validation

Current Joi validation is applied for:

- User registration
- User login

Rules include:

- `username` minimum 3 characters
- Valid email format
- `password` minimum 6 characters

## Important Notes

- Deleted products are soft deleted using `isDeleted: true`
- Product listing excludes soft-deleted products
- Blocked users cannot access protected routes
- Pagination defaults to `page=1` and `limit=12`
- CORS is configured using `FRONTEND_URL`

## Possible Future Improvements

- Add API documentation with Postman or Swagger
- Add refresh token support
- Improve cookie security for production with `secure: true`
- Add centralized error handling
- Add tests

