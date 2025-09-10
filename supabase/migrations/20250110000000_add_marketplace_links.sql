-- Add marketplace links to products table
-- Migration: Add Tokopedia, Shopee, TikTok links to products

USE central_blessindo_db;

-- Add new columns to products table
ALTER TABLE products 
ADD COLUMN tokopedia_link VARCHAR(500) DEFAULT NULL,
ADD COLUMN shopee_link VARCHAR(500) DEFAULT NULL,
ADD COLUMN tiktok_link VARCHAR(500) DEFAULT NULL;

-- Add comments for documentation
ALTER TABLE products 
MODIFY COLUMN tokopedia_link VARCHAR(500) DEFAULT NULL COMMENT 'Link to product on Tokopedia marketplace',
MODIFY COLUMN shopee_link VARCHAR(500) DEFAULT NULL COMMENT 'Link to product on Shopee marketplace',
MODIFY COLUMN tiktok_link VARCHAR(500) DEFAULT NULL COMMENT 'Link to product on TikTok Shop marketplace';
