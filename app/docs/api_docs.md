# API Documentation

- *Base URL:* `/api/v1`
- *Base Header:* `Content-Type: application/json`

## 1. Authentication methods

### 1.1 Login

- Route: `/sessions`
- Method: `POST`
- Params:
  - *user*
    - *email*
    - *password*
- Action: `CREATE`
- Controller: `Sessions`
- Expected response:
  - status: "created"
  - logged_in: true
  - user: {user data}
  
### 1.2 Logged in session

- Route: `/logged_in`
- Method: `GET`
- Params: -
- Action: `LOGGED_IN`
- Controller: `Sessions`
- Expected response:
  - logged_in: true
  - user: {user data}

### 1.3 Logout session

- Route: `/logout`
- Method: `DELETE`
- Params: -
- Action: `LOGGED_IN`
- Controller: `Sessions`
- Expected response:
  - status: 200
  - logged_out: true

### 1.4 Create user

- Route: `/users`
- Method: `POST`
- Params:
  - user:
    - email
    - password
    - password_confirmation
    - role
    - full_name
  - Action: `CREATE`
  - Controller: `Users`
  - Expected response:
    - status: "created"
    - user: { user data }

### 1.5 Edit account *PENDING*

- Route: `/users/%id/edit`
- Method: `PATCH`
- Params:
  - user:
    - role
    - full_name
- Expected response:
  - status: "user updated"
  - user: { user data }
- Action: `UPDATE`
- Controller: `Users`

### 1.5 Delete user *PENDING*

- Route: `/users/%id`
- Method: `DELETE`
- Params: -
- Action: `DELETE`
- Controller: `Users`
- Expected response:
  - status: 200
  - destroy_user: true

## Passwords methods
