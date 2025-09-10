-- Central Blessindo Indonesia Database Schema
-- Created for PT. Central Blessindo Indonesia plastic packaging company

CREATE DATABASE IF NOT EXISTS central_blessindo_db;
USE central_blessindo_db;

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(15,2) DEFAULT NULL,
    category_id INT,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Admin settings table
CREATE TABLE IF NOT EXISTS admin_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255) DEFAULT 'PT. CENTRAL BLESSINDO INDONESIA',
    address TEXT DEFAULT 'Perumahan The Greenhill Cluster Bayhill Blok B3 No. 14D Pondok Rajeg Cibinong Bogor 16914',
    phone VARCHAR(20) DEFAULT '082210119938',
    whatsapp VARCHAR(20) DEFAULT '085212278277',
    email VARCHAR(100) DEFAULT 'sales@centralblessindonesia.com',
    website VARCHAR(100) DEFAULT 'www.centralblessindonesia.com',
    vision_id TEXT DEFAULT 'Menjadi Perusahaan plastik terkemuka yang memberikan solusi inovatif untuk kemasan plastic',
    vision_en TEXT DEFAULT 'To be a plastic company that provides innovative solutions for plastic packaging',
    mission_id TEXT DEFAULT 'Kami memastikan spesifikasi yang tepat berdasarkan kebutuhan konsumen dengan berinovasi dan mendukung informasi dan teknologi',
    mission_en TEXT DEFAULT 'We ensure proper specification based on consumer\'s needs by innovating and supporting of information and technology',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table (for future use)
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(100),
    customer_phone VARCHAR(20),
    total_amount DECIMAL(15,2) DEFAULT 0,
    status ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Order items table (for future use)
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT DEFAULT 1,
    price DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Clients table for managing client logos
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url VARCHAR(500),
    website VARCHAR(255),
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin settings
INSERT INTO admin_settings (id) VALUES (1) ON DUPLICATE KEY UPDATE id = id;

-- Insert sample categories
INSERT INTO categories (name, description) VALUES
('PVC', 'Produk PVC berkualitas tinggi untuk berbagai kebutuhan kemasan'),
('POF Shrink', 'Film shrink POF dengan kualitas premium dan daya tahan tinggi'),
('Perforasi', 'Plastik perforasi dengan berbagai ukuran dan ketebalan'),
('Flat Siku', 'Plastik flat siku untuk kebutuhan packaging khusus') 
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample products
INSERT INTO products (name, description, price, category_id) VALUES
('PVC Clear Premium', '<p>PVC transparan dengan kualitas premium, cocok untuk packaging produk yang membutuhkan transparansi tinggi.</p><ul><li>Ketebalan: 0.2mm - 1.0mm</li><li>Lebar: 100cm - 150cm</li><li>Transparansi tinggi</li><li>Tahan lama dan fleksibel</li></ul>', 150000, 1),
('POF Shrink Film', '<p>Film shrink POF dengan kualitas terbaik untuk packaging makanan dan industri.</p><ul><li>Ketebalan: 12 - 25 micron</li><li>Lebar: 200mm - 1000mm</li><li>Tahan panas dan dingin</li><li>FDA approved untuk makanan</li></ul>', 200000, 2),
('Plastik Perforasi Standard', '<p>Plastik perforasi standard dengan lubang-lubang kecil yang tersusun rapi.</p><ul><li>Ukuran lubang: 2mm - 10mm</li><li>Jarak antar lubang dapat disesuaikan</li><li>Cocok untuk packaging produk fresh</li><li>Tersedia berbagai warna</li></ul>', 120000, 3),
('Flat Siku Tebal', '<p>Plastik flat siku dengan ketebalan ekstra untuk kebutuhan packaging heavy duty.</p><ul><li>Ketebalan: 0.5mm - 2.0mm</li><li>Ukuran dapat disesuaikan</li><li>Tahan sobek dan puncture</li><li>Ideal untuk produk berat</li></ul>', 180000, 4) 
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Insert sample clients
INSERT INTO clients (name, logo_url, website, description, sort_order) VALUES
('PT. Indofood Sukses Makmur', '/src/assets/our-clients/1.jpeg', 'https://www.indofood.com', 'Perusahaan makanan terbesar di Indonesia', 1),
('Unilever Indonesia', '/src/assets/our-clients/2.jpeg', 'https://www.unilever.co.id', 'Perusahaan consumer goods multinasional', 2),
('Wings Group', '/src/assets/our-clients/3.jpeg', 'https://www.wingscorp.com', 'Perusahaan consumer goods terkemuka', 3),
('Mayora Group', '/src/assets/our-clients/4.jpeg', 'https://www.mayora.com', 'Perusahaan makanan dan minuman', 4),
('Sari Roti', '/src/assets/our-clients/5.jpeg', 'https://www.sariroti.com', 'Produsen roti dan kue terbesar', 5),
('Garuda Food', '/src/assets/our-clients/6.jpeg', 'https://www.garudafood.com', 'Perusahaan makanan ringan', 6),
('Orang Tua Group', '/src/assets/our-clients/7.jpeg', 'https://www.ot.co.id', 'Perusahaan makanan dan minuman', 7),
('Sido Muncul', '/src/assets/our-clients/8.jpeg', 'https://www.sidomuncul.com', 'Perusahaan jamu dan herbal', 8),
('Ultrajaya', '/src/assets/our-clients/9.jpeg', 'https://www.ultrajaya.com', 'Perusahaan minuman dan makanan', 9),
('Kraft Foods', '/src/assets/our-clients/10.jpeg', 'https://www.kraftfoods.com', 'Perusahaan makanan multinasional', 10)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_clients_active ON clients(is_active);
CREATE INDEX idx_clients_sort_order ON clients(sort_order);

-- Views for reporting (optional)
CREATE OR REPLACE VIEW products_with_categories AS
SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.created_at,
    p.updated_at,
    c.name as category_name,
    c.id as category_id
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;

-- Statistics view
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT 
    (SELECT COUNT(*) FROM categories) as total_categories,
    (SELECT COUNT(*) FROM products) as total_products,
    (SELECT COUNT(*) FROM orders WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())) as monthly_orders,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE MONTH(created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE())) as monthly_revenue;