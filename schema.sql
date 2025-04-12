-- SQL script to create the 'posts' table for the Blogging Platform API

-- Make sure to create the database first, e.g., CREATE DATABASE blog_db;
-- Then select the database, e.g., USE blog_db;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags JSON, -- Using JSON type is recommended if available (MySQL 5.7.8+)
    -- Alternative for older MySQL versions or other preferences:
    -- tags TEXT, -- Store as comma-separated string or JSON string
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category), -- Optional: Add index for faster category filtering
    FULLTEXT INDEX idx_fulltext_search (title, content, category) -- Optional: Add fulltext index for efficient searching if using specific search features
);

-- Add users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Store hashed passwords, not plain text
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: Add index for faster email lookups
ALTER TABLE users ADD INDEX idx_email (email);

-- Note on 'tags':
-- If using the JSON type, you can store arrays directly, e.g., '["Tech", "Programming"]'.
-- If using TEXT, you would store it as a string, e.g., '["Tech","Programming"]' or 'Tech,Programming',
-- and handle parsing/stringifying in your application code (as done in the current postModel.js).
-- The current postModel.js implementation assumes tags are stored as a JSON string in the database,
-- which works with both TEXT and JSON column types, but the JSON type offers better querying capabilities within SQL if needed.

-- Note on Fulltext Index:
-- The FULLTEXT index allows for more efficient searching using MATCH() AGAINST() syntax in SQL,
-- which can be more performant than LIKE '%term%' for large datasets.
-- The current postModel.js uses LIKE for simplicity and broad compatibility.
