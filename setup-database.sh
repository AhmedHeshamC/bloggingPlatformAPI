#!/bin/bash

# Database Setup Script for Blogging Platform
# This script will create the database and seed it with sample data

echo "🚀 Setting up Blogging Platform Database..."

# Database credentials
DB_HOST="localhost"
DB_USER="root"
DB_PASSWORD="NewStrongP@ssw0rd"
DB_NAME="blogDb"

# MySQL command
MYSQL="mysql -h$DB_HOST -u$DB_USER -p$DB_PASSWORD"

echo "📝 Creating database if it doesn't exist..."
$MYSQL -e "CREATE DATABASE IF NOT EXISTS $DB_NAME;"

echo "🗃️ Creating tables..."
$MYSQL $DB_NAME < schema.sql

echo "🌱 Seeding database with sample data..."
$MYSQL $DB_NAME < seed-data.sql

echo "✅ Database setup complete!"

echo ""
echo "📊 Database Summary:"
$MYSQL $DB_NAME -e "SELECT 'Users:' as table, COUNT(*) as count FROM users UNION SELECT 'Posts:', COUNT(*) FROM posts;"

echo ""
echo "👤 Sample Users Created:"
echo "Admin: admin@blogplatform.com (password: admin123)"
echo "Users: john.doe@example.com, jane.smith@example.com, mike.johnson@example.com, sarah.wilson@example.com (password: password123)"

echo ""
echo "🎯 You can now start the application and test with these credentials!"