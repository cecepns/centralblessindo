const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Get current directory (available in CommonJS)
// __filename and __dirname are automatically available in CommonJS

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads-pt-central-blessindo')));

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'central_blessindo_db',
};

let db;

const connectDatabase = async () => {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads-pt-central-blessindo');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// JWT middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    req.user = user;
    next();
  });
};

// Utility functions
const sendResponse = (res, success, message, data = null) => {
  res.json({
    success,
    message,
    data
  });
};

const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

// ==================== AUTH ROUTES ====================

// Admin login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check credentials against environment variables
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

    if (username === adminUsername && password === adminPassword) {
      const token = jwt.sign(
        { username: adminUsername },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      sendResponse(res, true, 'Login successful', {
        token,
        user: { username: adminUsername }
      });
    } else {
      sendError(res, 'Invalid credentials', 401);
    }
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 'Internal server error');
  }
});

// ==================== CATEGORIES ROUTES ====================

// Get all categories
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM categories ORDER BY created_at DESC');
    sendResponse(res, true, 'Categories retrieved successfully', rows);
  } catch (error) {
    console.error('Get categories error:', error);
    sendError(res, 'Failed to retrieve categories');
  }
});

// Create new category
app.post('/api/categories', authenticateToken, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return sendError(res, 'Category name is required', 400);
    }

    const [result] = await db.execute(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    sendResponse(res, true, 'Category created successfully', {
      id: result.insertId,
      name,
      description
    });
  } catch (error) {
    console.error('Create category error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      sendError(res, 'Category name already exists', 400);
    } else {
      sendError(res, 'Failed to create category');
    }
  }
});

// Update category
app.put('/api/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return sendError(res, 'Category name is required', 400);
    }

    const [result] = await db.execute(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [name, description || null, id]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 'Category not found', 404);
    }

    sendResponse(res, true, 'Category updated successfully');
  } catch (error) {
    console.error('Update category error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      sendError(res, 'Category name already exists', 400);
    } else {
      sendError(res, 'Failed to update category');
    }
  }
});

// Delete category
app.delete('/api/categories/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if category has products
    const [products] = await db.execute('SELECT COUNT(*) as count FROM products WHERE category_id = ?', [id]);
    
    if (products[0].count > 0) {
      return sendError(res, 'Cannot delete category with products', 400);
    }

    const [result] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return sendError(res, 'Category not found', 404);
    }

    sendResponse(res, true, 'Category deleted successfully');
  } catch (error) {
    console.error('Delete category error:', error);
    sendError(res, 'Failed to delete category');
  }
});

// ==================== PRODUCTS ROUTES ====================

// Get all products with pagination (admin)
app.get('/api/products', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    let queryParams = [];

    if (category) {
      query += ' WHERE category_id = ?';
      countQuery += ' WHERE category_id = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [products] = await db.execute(query, queryParams);
    const [totalResult] = await db.execute(countQuery, category ? [category] : []);
    
    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limit);

    sendResponse(res, true, 'Products retrieved successfully', {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    sendError(res, 'Failed to retrieve products');
  }
});

// Get all products (public - for frontend)
app.get('/api/products/public', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    let queryParams = [];

    if (category) {
      query += ' WHERE category_id = ?';
      countQuery += ' WHERE category_id = ?';
      queryParams.push(category);
    }

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [products] = await db.execute(query, queryParams);
    const [totalResult] = await db.execute(countQuery, category ? [category] : []);
    
    const total = totalResult[0].total;
    const totalPages = Math.ceil(total / limit);

    sendResponse(res, true, 'Products retrieved successfully', {
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.error('Get public products error:', error);
    sendError(res, 'Failed to retrieve products');
  }
});

// Get single product by ID (public)
app.get('/api/products/public/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [products] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    
    if (products.length === 0) {
      return sendError(res, 'Product not found', 404);
    }

    sendResponse(res, true, 'Product retrieved successfully', products[0]);
  } catch (error) {
    console.error('Get single product error:', error);
    sendError(res, 'Failed to retrieve product');
  }
});

// Create new product
app.post('/api/products', authenticateToken, async (req, res) => {
  try {
    const { name, description, price, category_id, image_url, tokopedia_link, shopee_link, tiktok_link } = req.body;

    if (!name || !description || !category_id) {
      return sendError(res, 'Name, description, and category are required', 400);
    }

    const [result] = await db.execute(
      'INSERT INTO products (name, description, price, category_id, image_url, tokopedia_link, shopee_link, tiktok_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, description, price || null, category_id, image_url || null, tokopedia_link || null, shopee_link || null, tiktok_link || null]
    );

    sendResponse(res, true, 'Product created successfully', {
      id: result.insertId,
      name,
      description,
      price,
      category_id,
      image_url,
      tokopedia_link,
      shopee_link,
      tiktok_link
    });
  } catch (error) {
    console.error('Create product error:', error);
    sendError(res, 'Failed to create product');
  }
});

// Update product
app.put('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category_id, image_url, tokopedia_link, shopee_link, tiktok_link } = req.body;

    if (!name || !description || !category_id) {
      return sendError(res, 'Name, description, and category are required', 400);
    }

    // Get current product to check for old image
    const [currentProduct] = await db.execute('SELECT image_url FROM products WHERE id = ?', [id]);
    
    if (currentProduct.length === 0) {
      return sendError(res, 'Product not found', 404);
    }

    const [result] = await db.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ?, tokopedia_link = ?, shopee_link = ?, tiktok_link = ? WHERE id = ?',
      [name, description, price || null, category_id, image_url || null, tokopedia_link || null, shopee_link || null, tiktok_link || null, id]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 'Product not found', 404);
    }

    // Delete old image file if it exists and is different from new image
    const oldImageUrl = currentProduct[0].image_url;
    if (oldImageUrl && oldImageUrl !== image_url) {
      const imagePath = oldImageUrl.replace('/uploads/', '');
      const fullImagePath = path.join(__dirname, 'uploads-pt-central-blessindo', imagePath);
      
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
        console.log(`Deleted old product image: ${fullImagePath}`);
      }
    }

    sendResponse(res, true, 'Product updated successfully');
  } catch (error) {
    console.error('Update product error:', error);
    sendError(res, 'Failed to update product');
  }
});

// Delete product
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get product to delete image file
    const [product] = await db.execute('SELECT image_url FROM products WHERE id = ?', [id]);
    
    const [result] = await db.execute('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return sendError(res, 'Product not found', 404);
    }

    // Delete image file if exists
    if (product[0]?.image_url) {
      const imagePath = product[0].image_url.replace('/uploads/', '');
      const fullImagePath = path.join(__dirname, 'uploads-pt-central-blessindo', imagePath);
      
      if (fs.existsSync(fullImagePath)) {
        fs.unlinkSync(fullImagePath);
      }
    }

    sendResponse(res, true, 'Product deleted successfully');
  } catch (error) {
    console.error('Delete product error:', error);
    sendError(res, 'Failed to delete product');
  }
});

// Upload product image
app.post('/api/products/upload-image', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided', 400);
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    
    sendResponse(res, true, 'Image uploaded successfully', {
      imageUrl
    });
  } catch (error) {
    console.error('Upload image error:', error);
    sendError(res, 'Failed to upload image');
  }
});

// ==================== ADMIN SETTINGS ROUTES ====================

// Get admin settings
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM admin_settings WHERE id = 1');
    
    if (rows.length === 0) {
      return sendError(res, 'Settings not found', 404);
    }

    sendResponse(res, true, 'Settings retrieved successfully', rows[0]);
  } catch (error) {
    console.error('Get settings error:', error);
    sendError(res, 'Failed to retrieve settings');
  }
});

// Update admin settings
app.put('/api/settings', authenticateToken, async (req, res) => {
  try {
    const {
      company_name,
      address,
      phone,
      whatsapp,
      email,
      website,
      vision_id,
      vision_en,
      mission_id,
      mission_en
    } = req.body;

    const [result] = await db.execute(
      `UPDATE admin_settings SET 
        company_name = ?,
        address = ?,
        phone = ?,
        whatsapp = ?,
        email = ?,
        website = ?,
        vision_id = ?,
        vision_en = ?,
        mission_id = ?,
        mission_en = ?
      WHERE id = 1`,
      [
        company_name,
        address,
        phone,
        whatsapp,
        email,
        website,
        vision_id,
        vision_en,
        mission_id,
        mission_en
      ]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 'Settings not found', 404);
    }

    sendResponse(res, true, 'Settings updated successfully');
  } catch (error) {
    console.error('Update settings error:', error);
    sendError(res, 'Failed to update settings');
  }
});

// ==================== CLIENTS ROUTES ====================

// Get all clients (admin)
app.get('/api/clients', authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM clients ORDER BY sort_order ASC, created_at DESC');
    sendResponse(res, true, 'Clients retrieved successfully', rows);
  } catch (error) {
    console.error('Get clients error:', error);
    sendError(res, 'Failed to retrieve clients');
  }
});

// Get all active clients (public)
app.get('/api/clients/public', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM clients WHERE is_active = 1 ORDER BY sort_order ASC, created_at DESC');
    sendResponse(res, true, 'Active clients retrieved successfully', rows);
  } catch (error) {
    console.error('Get public clients error:', error);
    sendError(res, 'Failed to retrieve clients');
  }
});

// Create new client
app.post('/api/clients', authenticateToken, async (req, res) => {
  try {
    const { name, logo_url, website, description, is_active, sort_order } = req.body;

    if (!name) {
      return sendError(res, 'Client name is required', 400);
    }

    const [result] = await db.execute(
      'INSERT INTO clients (name, logo_url, website, description, is_active, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
      [name, logo_url || null, website || null, description || null, is_active !== undefined ? is_active : true, sort_order || 0]
    );

    sendResponse(res, true, 'Client created successfully', {
      id: result.insertId,
      name,
      logo_url,
      website,
      description,
      is_active: is_active !== undefined ? is_active : true,
      sort_order: sort_order || 0
    });
  } catch (error) {
    console.error('Create client error:', error);
    sendError(res, 'Failed to create client');
  }
});

// Update client
app.put('/api/clients/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo_url, website, description, is_active, sort_order } = req.body;

    if (!name) {
      return sendError(res, 'Client name is required', 400);
    }

    // Get current client to check for old logo
    const [currentClient] = await db.execute('SELECT logo_url FROM clients WHERE id = ?', [id]);
    
    if (currentClient.length === 0) {
      return sendError(res, 'Client not found', 404);
    }

    const [result] = await db.execute(
      'UPDATE clients SET name = ?, logo_url = ?, website = ?, description = ?, is_active = ?, sort_order = ? WHERE id = ?',
      [name, logo_url || null, website || null, description || null, is_active, sort_order || 0, id]
    );

    if (result.affectedRows === 0) {
      return sendError(res, 'Client not found', 404);
    }

    // Delete old logo file if it exists and is different from new logo
    const oldLogoUrl = currentClient[0].logo_url;
    if (oldLogoUrl && oldLogoUrl !== logo_url) {
      const logoPath = oldLogoUrl.replace('/uploads/', '');
      const fullLogoPath = path.join(__dirname, 'uploads-pt-central-blessindo', logoPath);
      
      if (fs.existsSync(fullLogoPath)) {
        fs.unlinkSync(fullLogoPath);
        console.log(`Deleted old client logo: ${fullLogoPath}`);
      }
    }

    sendResponse(res, true, 'Client updated successfully');
  } catch (error) {
    console.error('Update client error:', error);
    sendError(res, 'Failed to update client');
  }
});

// Delete client
app.delete('/api/clients/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Get client to delete logo file
    const [client] = await db.execute('SELECT logo_url FROM clients WHERE id = ?', [id]);
    
    const [result] = await db.execute('DELETE FROM clients WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return sendError(res, 'Client not found', 404);
    }

    // Delete logo file if exists
    if (client[0]?.logo_url) {
      const logoPath = client[0].logo_url.replace('/uploads/', '');
      const fullLogoPath = path.join(__dirname, 'uploads-pt-central-blessindo', logoPath);
      
      if (fs.existsSync(fullLogoPath)) {
        fs.unlinkSync(fullLogoPath);
        console.log(`Deleted client logo: ${fullLogoPath}`);
      }
    }

    sendResponse(res, true, 'Client deleted successfully');
  } catch (error) {
    console.error('Delete client error:', error);
    sendError(res, 'Failed to delete client');
  }
});

// Upload client logo
app.post('/api/clients/upload-logo', authenticateToken, upload.single('logo'), (req, res) => {
  try {
    if (!req.file) {
      return sendError(res, 'No logo file provided', 400);
    }

    const logoUrl = `/uploads/${req.file.filename}`;
    
    sendResponse(res, true, 'Logo uploaded successfully', {
      logoUrl
    });
  } catch (error) {
    console.error('Upload logo error:', error);
    sendError(res, 'Failed to upload logo');
  }
});

// ==================== DASHBOARD ROUTES ====================

// Get dashboard statistics
app.get('/api/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    // Query the dashboard_stats view
    const [stats] = await db.execute('SELECT * FROM dashboard_stats');
    
    const result = stats[0] || {
      total_categories: 0,
      total_products: 0,
      monthly_orders: 0,
      monthly_revenue: 0
    };

    // Map the database field names to the expected frontend field names
    const mappedResult = {
      totalCategories: result.total_categories || 0,
      totalProducts: result.total_products || 0,
      totalOrders: result.monthly_orders || 0,
      monthlyRevenue: result.monthly_revenue || 0
    };

    sendResponse(res, true, 'Dashboard stats retrieved successfully', mappedResult);
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    sendError(res, 'Failed to retrieve dashboard stats');
  }
});

// ==================== ERROR HANDLING ====================

// Handle multer errors
app.use((error, req, res, _next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return sendError(res, 'File size too large. Maximum 5MB allowed', 400);
    }
  }
  
  if (error.message === 'Only image files are allowed') {
    return sendError(res, error.message, 400);
  }
  
  console.error('Unexpected error:', error);
  sendError(res, 'Internal server error');
});

// Handle 404 routes
app.use('*', (req, res) => {
  sendError(res, 'Route not found', 404);
});

// ==================== SERVER STARTUP ====================

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📁 Upload directory: ${path.join(__dirname, 'uploads-pt-central-blessindo')}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
      console.log(`👤 Admin Login: ${process.env.ADMIN_USERNAME || 'admin'} / ${process.env.ADMIN_PASSWORD || 'password123'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🔻 Shutting down server...');
  if (db) {
    await db.end();
    console.log('Database connection closed');
  }
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔻 Server terminated');
  if (db) {
    await db.end();
  }
  process.exit(0);
});

startServer();