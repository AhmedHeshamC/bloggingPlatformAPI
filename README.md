# Blogging Platform API By Ahmed Hesham

A RESTful API for a personal blogging platform, built with Node.js, Express, and MySQL.

## Features

- Create, read, update, and delete blog posts
- Search/filter posts by term (title, content, or category)
- Input validation
- Rate limiting
- Error handling middleware
- JWT-based authentication for protected routes (Not fully implemented yet!)

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
   - Copy `.env.example` to `.env` and set your values (see `.env` for JWT secret).

4. **Set up the database:**
   - Create a MySQL database (e.g., `blog_db`).
   - Run the SQL in `schema.sql` to create the `posts` table.

5. **Start the server:**
   ```bash
   npm run dev
   ```
   The API will be available at `http://localhost:3000`.

## Project Structure

```
/controllers      # Route handlers
/models           # Database models
/routes           # Express route definitions
/middleware       # Custom middleware (auth, validation, error handling, rate limiting)
/config           # Database configuration
```

---

## API Documentation

### Authentication (To be completed)

Some routes (e.g., `/api/protected`) require a JWT in the `Authorization` header:  
`Authorization: Bearer <token>`

### Endpoints

#### Create a Blog Post

- **POST** `/posts`
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

- **GET** `/posts`
- **Query:** `?term=searchTerm` (optional)
- **Responses:**
  - `200 OK` with array of posts

#### Get a Single Blog Post

- **GET** `/posts/:id`
- **Responses:**
  - `200 OK` with the post
  - `404 Not Found` if not found

#### Update a Blog Post

- **PUT** `/posts/:id`
- **Body:** (same as create)
- **Responses:**
  - `200 OK` with updated post
  - `400 Bad Request` on validation error
  - `404 Not Found` if not found

#### Delete a Blog Post

- **DELETE** `/posts/:id`
- **Responses:**
  - `204 No Content` on success
  - `404 Not Found` if not found

#### Protected Route Example

- **GET** `/api/protected`
- **Header:** `Authorization: Bearer <token>`
- **Responses:**
  - `200 OK` with greeting
  - `401 Unauthorized` if no/invalid token

---

## Error Handling

Errors are returned as JSON with a `message` field and, in development, a `stack` trace.

---

## License

MIT

## Author
Ahmed Hesham    

## Acknowledgments
- [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
- [MySQL](https://www.mysql.com/) - The world's most popular open source database  
- [Markdown](https://daringfireball.net/projects/markdown/) A lightweight markup language for formatting text
- ThunderClient - A powerful API client for testing and debugging APIs
- Open Source Community - For all the resources and libraries that made this project possible
- https://roadmap.sh/projects/blogging-platform-api
