# Blogging Platform API By Ahmed Hesham

A RESTful API for a personal blogging platform, built with Node.js, Express, and MySQL.

## Features

- Create, read, update, and delete blog posts (versioned: `/api/v1`)
- User registration and login (`/api/v1/auth`)
- Search/filter posts by term (title, content, or category)
- Input validation
- Rate limiting
- Error handling middleware
- JWT-based authentication for protected routes

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MySQL database

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AhmedHeshamC/bloggingPlatformAPI.git
   cd bloggingPlatformAPI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Create a `.env` file (you can copy `.env.example`) and set your values:
     - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
     - `JWT_SECRET` (a long, random, secret string for signing tokens)
     - `JWT_EXPIRES_IN` (e.g., `1h`, `7d`)
     - `BCRYPT_SALT_ROUNDS` (e.g., `10`, `12` - higher is more secure but slower)

4. **Set up the database:**
   - Create a MySQL database (e.g., `blog_db`).
   - Run the SQL in `schema.sql` to create the `posts` and `users` tables.

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`. Version 1 endpoints are under `/api/v1`.

## Project Structure

```
/controllers      # Route handlers (posts, auth)
/models           # Database models (posts, users)
/routes           # Express route definitions (posts, auth, protected)
/middleware       # Custom middleware (auth, validation, error handling, rate limiting)
/config           # Database configuration
.env.example      # Example environment variables
.env              # Actual environment variables (ignored by git)
schema.sql        # Database schema
```

---

## API Documentation (Version 1)

Base Path: `/api/v1`

### Authentication

Authentication is handled via JSON Web Tokens (JWT).

1.  **Register:** Use the `POST /api/v1/auth/register` endpoint.
2.  **Login:** Use the `POST /api/v1/auth/login` endpoint to receive a JWT.
3.  **Access Protected Routes:** Include the token in the `Authorization` header for protected routes:
    `Authorization: Bearer <your_jwt_token>`

### Endpoints

#### Authentication Routes (`/auth`)

-   **POST** `/auth/register`
    -   **Body:**
        ```json
        {
          "name": "Test User",
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    -   **Responses:**
        -   `201 Created` with user info (excluding password)
        -   `400 Bad Request` on validation error
        -   `409 Conflict` if email already exists

-   **POST** `/auth/login`
    -   **Body:**
        ```json
        {
          "email": "test@example.com",
          "password": "password123"
        }
        ```
    -   **Responses:**
        -   `200 OK` with JWT token and user info
        -   `400 Bad Request` on validation error
        -   `401 Unauthorized` on invalid credentials

#### Create a Blog Post

- **POST** `/api/v1/posts`
- **Body:**
  ```json
  {
    "title": "My First Blog Post",
    "content": "This is the content.",
    "category": "Technology",
    "tags": ["Tech", "Programming"]
  }
  ```
- **Responses:**
  - `201 Created` with the created post
  - `400 Bad Request` on validation error

#### Get All Blog Posts

- **GET** `/api/v1/posts`
- **Query:** `?term=searchTerm` (optional)
- **Responses:**
  - `200 OK` with array of posts

#### Get a Single Blog Post

- **GET** `/api/v1/posts/:id`
- **Responses:**
  - `200 OK` with the post
  - `404 Not Found` if not found

#### Update a Blog Post

- **PUT** `/api/v1/posts/:id`
- **Body:** (same as create)
- **Responses:**
  - `200 OK` with updated post
  - `400 Bad Request` on validation error
  - `404 Not Found` if not found

#### Delete a Blog Post

- **DELETE** `/api/v1/posts/:id`
- **Responses:**
  - `204 No Content` on success
  - `404 Not Found` if not found

#### Protected Route Example

- **GET** `/api/v1/protected`
- **Header:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` with greeting
  - `401 Unauthorized` if no/invalid token

---

## Error Handling

Errors are returned as JSON with a `message` field and, in development, a `stack` trace.

---

##Project URLs
- https://roadmap.sh/projects/blogging-platform-api

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Write tests
4. Submit a PR

Please adhere to the existing code style and coverage requirements.

---

© 2025 Ahmed Hesham. MIT License.
