# E-Commerce Website Backend - Node.js & Express

## Overview
This is the backend for an E-Commerce website built using Node.js and Express. It provides APIs for managing products, user authentication, and shopping cart functionality. The data is stored in a MongoDB database, and authentication is handled via JWT (JSON Web Tokens).

## Features
- **Product Management**: API endpoints for adding, updating, deleting, and retrieving products.
- **User Authentication**: User registration, login, and JWT-based authentication.
- **Shopping Cart Management**: APIs to manage items in a user's cart.
- **Order Management**: APIs for placing and viewing orders.
- **Database**: MongoDB is used as the database to store product and user data.

## Tech Stack
- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: MongoDB object modeling tool.
- **JWT (JSON Web Token)**: For user authentication and authorization.
- **bcryptjs**: For password hashing.
- **dotenv**: To manage environment variables.

## Installation and Setup
Follow the instructions below to set up and run the project locally.

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (either locally installed or a cloud instance like MongoDB Atlas)
- npm or yarn

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-backend-repo.git
   cd your-backend-repo
