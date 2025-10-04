-- Seed data for Blogging Platform
-- This script will create sample users and blog posts

-- First, create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS blogDb;
USE blogDb;

-- Clear existing data (optional - comment out if you want to preserve data)
-- DELETE FROM posts;
-- DELETE FROM users;

-- Insert sample users with hashed passwords
-- Admin password: admin123
-- Other users password: password123
INSERT INTO users (id, name, email, password, createdAt, updatedAt) VALUES
(1, 'Admin User', 'admin@blogplatform.com', '$2b$10$zyBxosEOgT.EV4/98g4yBu6.D4Jq.t6Qfd/hNB9Pf7ZM/2Qt4fCha', NOW(), NOW()),
(2, 'John Doe', 'john.doe@example.com', '$2b$10$WIAPMWpo1UUA6IRyQjroYu9p9oIoUy.KatS2M83etzIoVT.Wb0mJC', NOW(), NOW()),
(3, 'Jane Smith', 'jane.smith@example.com', '$2b$10$aAf0BKI9fTFveiEbASp.ge1AWjl.Sc/4gEufnX2ijBKQoWA4qbjf2', NOW(), NOW()),
(4, 'Mike Johnson', 'mike.johnson@example.com', '$2b$10$iTvAyBG..3oUkgWbrCCm5.ooD6R8ru2F94uruAKIL87SnU/dtK7s2', NOW(), NOW()),
(5, 'Sarah Wilson', 'sarah.wilson@example.com', '$2b$10$S3ljr9XtShEUsw6Uk7rcMuWC1cwtGvcKpqX.ayZTY6DHzxalxiNlq', NOW(), NOW());

-- Insert sample blog posts
INSERT INTO posts (title, content, category, tags, authorId, createdAt, updatedAt) VALUES
-- Technology posts by John Doe
('Getting Started with React Hooks', 'React Hooks revolutionized the way we write React components. In this comprehensive guide, we will explore everything from the basics of useState and useEffect to advanced patterns like custom hooks and performance optimization. Hooks provide a more direct API to React concepts you already know: props, state, context, refs, and lifecycle. We will build several practical examples that demonstrate how Hooks can simplify your code and make it more reusable.', 'Technology', '["React", "JavaScript", "Frontend", "Hooks"]', 2, '2025-01-15 10:00:00', '2025-01-15 10:00:00'),

('TypeScript Best Practices in 2025', 'TypeScript has become the de facto standard for large-scale JavaScript applications. This article covers the latest best practices including strict typing, utility types, generic constraints, and advanced patterns. We will also discuss how to effectively type React components, handle async operations, and leverage TypeScript for better developer experience and code maintainability.', 'Technology', '["TypeScript", "JavaScript", "Best Practices", "Frontend"]', 2, '2025-01-20 14:30:00', '2025-01-20 14:30:00'),

('Building Scalable APIs with Node.js', 'Creating scalable APIs requires careful planning and architecture. This guide covers essential topics including microservices architecture, database design patterns, caching strategies, load balancing, and monitoring. We will explore real-world examples and learn how to build APIs that can handle millions of requests while maintaining performance and reliability.', 'Technology', '["Node.js", "API", "Backend", "Scalability"]', 2, '2025-01-25 09:15:00', '2025-01-25 09:15:00'),

-- Web Development posts by Jane Smith
('Modern CSS Techniques for Responsive Design', 'CSS has evolved significantly with new features like Grid, Flexbox, and Custom Properties. This comprehensive guide explores how to create beautiful, responsive layouts using modern CSS techniques. We will cover container queries, aspect ratios, logical properties, and how to build designs that work seamlessly across all device sizes.', 'Web Development', '["CSS", "Responsive Design", "Frontend", "Layout"]', 3, '2025-01-18 16:45:00', '2025-01-18 16:45:00'),

('JavaScript Performance Optimization', 'Performance is crucial for modern web applications. This article dives deep into JavaScript optimization techniques including code splitting, lazy loading, memoization, and efficient DOM manipulation. We will also explore browser devtools, performance profiling, and how to identify and fix common performance bottlenecks.', 'Web Development', '["JavaScript", "Performance", "Optimization", "Frontend"]', 3, '2025-01-22 11:20:00', '2025-01-22 11:20:00'),

-- Programming posts by Mike Johnson
('Understanding Algorithms and Data Structures', 'Algorithms and data structures are the foundation of computer science. This beginner-friendly guide explains fundamental concepts including arrays, linked lists, stacks, queues, trees, and graphs. We will also explore common algorithms like sorting, searching, and dynamic programming with practical examples in JavaScript.', 'Programming', '["Algorithms", "Data Structures", "JavaScript", "Computer Science"]', 4, '2025-01-12 13:00:00', '2025-01-12 13:00:00'),

('Clean Code Principles Every Developer Should Know', 'Writing clean, maintainable code is essential for long-term project success. This article covers the SOLID principles, DRY, KISS, and other fundamental concepts of clean code. We will explore practical examples, refactoring techniques, and how to write code that is easy to understand, modify, and extend.', 'Programming', '["Clean Code", "Best Practices", "Software Engineering", "Refactoring"]', 4, '2025-01-28 15:30:00', '2025-01-28 15:30:00'),

-- Tutorial posts by Sarah Wilson
('Building Your First Full-Stack Application', 'Ready to build your first full-stack application? This step-by-step tutorial guides you through creating a complete web application from scratch. We will cover frontend development with React, backend API creation with Node.js, database integration, user authentication, and deployment strategies.', 'Tutorial', '["Full Stack", "React", "Node.js", "Tutorial"]', 5, '2025-01-10 10:30:00', '2025-01-10 10:30:00'),

('Docker Containerization for Beginners', 'Docker has revolutionized how we develop and deploy applications. This beginner-friendly guide introduces Docker concepts, containerization benefits, and practical usage. Learn how to create Dockerfiles, manage containers, use Docker Compose for multi-container applications, and implement Docker in your development workflow.', 'Tutorial', '["Docker", "DevOps", "Containers", "Deployment"]', 5, '2025-01-24 08:45:00', '2025-01-24 08:45:00'),

-- Tech posts by Admin
('The Future of Web Development: Trends to Watch in 2025', 'The web development landscape is constantly evolving. This article explores the latest trends including WebAssembly, Progressive Web Apps, AI integration, edge computing, and the rise of low-code/no-code platforms. We will discuss how these technologies are shaping the future of web development and what skills developers should focus on.', 'Technology', '["Future Tech", "Web Development", "Trends", "Innovation"]', 1, '2025-01-30 12:00:00', '2025-01-30 12:00:00'),

('Cybersecurity Best Practices for Developers', 'Security should be a primary concern for every developer. This comprehensive guide covers essential cybersecurity practices including input validation, authentication, authorization, encryption, and secure coding practices. Learn how to protect your applications from common vulnerabilities and build secure software.', 'Technology', '["Security", "Cybersecurity", "Best Practices", "Development"]', 1, '2025-01-08 17:20:00', '2025-01-08 17:20:00'),

-- More variety posts
('Machine Learning Fundamentals for Web Developers', 'Machine Learning is no longer just for data scientists. This article introduces ML concepts specifically for web developers. Learn about TensorFlow.js, ML in the browser, recommendation systems, and how to integrate ML capabilities into web applications without deep mathematical knowledge.', 'AI/ML', '["Machine Learning", "JavaScript", "AI", "TensorFlow.js"]', 2, '2025-01-26 14:00:00', '2025-01-26 14:00:00'),

('Mobile-First Design: A Complete Guide', 'Mobile-first design is essential in today\'s multi-device world. This comprehensive guide covers responsive design principles, touch interfaces, performance optimization for mobile devices, and progressive enhancement. Learn how to create experiences that work beautifully on all screen sizes.', 'Web Development', '["Mobile Design", "Responsive", "UX", "Frontend"]', 3, '2025-01-14 09:30:00', '2025-01-14 09:30:00'),

('Git Advanced Techniques and Workflows', 'Go beyond basic Git commands with advanced techniques including branching strategies, cherry-picking, rebasing, and bisecting. This guide covers professional Git workflows like Git Flow and GitHub Flow, conflict resolution, and how to maintain a clean commit history in team environments.', 'Programming', '["Git", "Version Control", "Workflow", "Collaboration"]', 4, '2025-01-16 11:45:00', '2025-01-16 11:45:00'),

('Database Design Patterns for Scalable Applications', 'Good database design is crucial for application performance and scalability. This article explores normalization, indexing strategies, query optimization, and database design patterns. Learn how to design databases that can handle growth, maintain data integrity, and provide optimal query performance.', 'Technology', '["Database", "SQL", "Architecture", "Performance"]', 5, '2025-01-19 13:15:00', '2025-01-19 13:15:00');

-- Verify data insertion
SELECT 'Users created:' as message, COUNT(*) as count FROM users;
SELECT 'Posts created:' as message, COUNT(*) as count FROM posts;

-- Show sample data
SELECT id, name, email, createdAt FROM users LIMIT 3;
SELECT id, title, category, authorId, createdAt FROM posts LIMIT 5;