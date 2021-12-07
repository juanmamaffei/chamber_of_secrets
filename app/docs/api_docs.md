# API Documentation

- *Base URL:* `/api/v1`
- *Base Header:* `Content-Type: application/json`

## Table of contents

1. Authentication methods
   1. Login
   2. Logged in session
   3. Logout
   4. Create user
   5. Edit account (In progress)
   6. Delete User (In progress)
   7. Toggle admin (In progress)
   8. Toggle authorized (In progress)
   9. Change password (In progress)
2. Password methods (Not created yet)
    1. Dashboard
    2. Create pass
    3. Edit pass
    4. Delete pass

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
  - user: { user data }
  
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

### 1.5 Edit account

- Route: `/users/%id`
- Method: `PATCH` | [More info...](https://www.bbvanexttechnologies.com/blogs/como-utilizar-los-metodos-put-y-patch-en-el-diseno-de-tus-apis-restful/)
- Params:
  - user:
    - role
    - full_name
- Expected response:
  - status: "user updated"
  - user: { user data }
- Action: `UPDATE`
- Controller: `Users`

### 1.6 Delete user *PENDING*

- Route: `/users/%id`
- Method: `DELETE`
- Params: -
- Action: `DELETE`
- Controller: `Users`
- Expected response:
  - status: 200
  - destroy_user: true

## Passwords methods