const pool = require('../config/db');

// Helper to parse tags (assuming stored as JSON string)
const parseTags = (post) => {
  if (post && post.tags && typeof post.tags === 'string') {
    try {
      post.tags = JSON.parse(post.tags);
    } catch (e) {
      console.error('Error parsing tags for post ID:', post.id, e);
      post.tags = []; // Default to empty array on parse error
    }
  } else if (post && !post.tags) {
      post.tags = []; // Ensure tags field exists
  }
  return post;
};

// Find all posts, optionally filtering by term
exports.findAll = async (term) => {
  let sql = 'SELECT * FROM posts ORDER BY createdAt DESC';
  const params = [];
  if (term) {
    sql = 'SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? OR category LIKE ? ORDER BY createdAt DESC';
    const searchTerm = `%${term}%`;
    params.push(searchTerm, searchTerm, searchTerm);
  }
  const [rows] = await pool.query(sql, params);
  return rows.map(parseTags);
};

// Create a new post
exports.create = async (postData) => {
  const { title, content, category, tags } = postData;
  // Ensure tags are stored as a JSON string
  const tagsString = JSON.stringify(tags || []);
  const sql = 'INSERT INTO posts (title, content, category, tags) VALUES (?, ?, ?, ?)';
  const [result] = await pool.query(sql, [title, content, category, tagsString]);
  const insertedId = result.insertId;
  return this.findById(insertedId); // Return the newly created post
};

// Find a post by its ID
exports.findById = async (id) => {
  const sql = 'SELECT * FROM posts WHERE id = ?';
  const [rows] = await pool.query(sql, [id]);
  if (rows.length === 0) {
    return null;
  }
  return parseTags(rows[0]);
};

// Update a post by its ID
exports.updateById = async (id, postData) => {
  const { title, content, category, tags } = postData;
  const tagsString = JSON.stringify(tags || []);
  const sql = 'UPDATE posts SET title = ?, content = ?, category = ?, tags = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?';
  const [result] = await pool.query(sql, [title, content, category, tagsString, id]);
  if (result.affectedRows === 0) {
    return null; // Indicate post not found or not updated
  }
  return this.findById(id); // Return the updated post
};

// Delete a post by its ID
exports.deleteById = async (id) => {
  const sql = 'DELETE FROM posts WHERE id = ?';
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0; // Return true if a row was deleted, false otherwise
};
