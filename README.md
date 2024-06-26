# Project Setup Guide

This guide provides detailed instructions to set up and run the project on your local machine.

## Prerequisites

Ensure the following tools are installed on your system:

- MySQL Server (Version 8.0.36 or later)
- Node.js
- npm

## Database Setup

1. **Install MySQL Server**: Download and install MySQL Server from the [official MySQL website](https://dev.mysql.com/downloads/mysql/). Remember your MySQL root username and password.

2. **Create Database**:

   - Open Command Prompt and navigate to your MySQL Server's bin directory. Adjust the path according to your MySQL installation directory:
     ```bash
     cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
     ```
   - Login to MySQL as root. You will be prompted to enter your password:
     ```bash
     mysql -u root -p
     ```
   - Execute the following command in the MySQL shell to create a new database named `testdb`:
     ```sql
     CREATE DATABASE testdb;
     ```
   - Type `exit` to leave the MySQL command-line tool.

3. **Import Database Schema**:
   - Ensure you are still in the MySQL bin directory where the `mysql` tool is located. Import the `database.sql` file to `testdb` using the following command, replacing `path/to/database.sql` with the actual path to your `database.sql` file. This file should be in the Backend directory of your project:
     ```bash
     mysql -u root -p testdb < path/to/database.sql
     ```
     After executing this command, you'll be prompted for your password. Enter it to proceed with the import.

## Backend Setup

## Backend Environment Setup

1. **Navigate to Backend Directory**: Open your terminal and navigate to the `Backend` directory of the project:

   ```bash
   cd Backend
   ```

2. **Update Database Credentials**: Locate the `.env` file in the `Backend` directory. Then, update it with your MySQL database credentials. The default credentials are :

   ```plaintext
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=password
   DB_DATABASE=testdb
   ```

   Adjust `DB_USER`, `DB_PASSWORD`, and `DB_NAME` according to your MySQL setup.

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Start Server**:
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:8000`.

## Frontend Setup

1. **Navigate to Frontend**:

   ```bash
   cd Frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Launch Application**:
   ```bash
   npm run dev
   ```
   Access it at `http://localhost:3000`.

## Accessing the Application

- **Login Page**: Open `http://localhost:3000` to reach the login/signup page.

- **Default Login Credentials**:
  - Admin Access:
    - Email: `admin@example.com`
    - Password: `admin_password`
  - User Access:
    - Email: `test@gmail.com`
    - Password: `test123`

Use these credentials to log in and explore the functionalities provided in the dashboard. And you can further signup, create accounts and test other operations.

