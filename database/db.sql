DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `pwd` int NOT NULL,
  `phone` int NOT NULL,
  `email` varchar(255),
  `status` int NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `pages` varchar(255) NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- users
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255),
  `pwd` int NOT NULL,
  `role_id` int NOT NULL,
  `company_id` int NOT NULL,
  `status` int NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- company
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `name_ru` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `address_ru` varchar(255) DEFAULT NULL,
  `lat` text,
  `lng` text,
  `inn` int NOT NULL,
  `phone` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'main' COMMENT 'main, branch',
  `parent_id` int NOT NULL DEFAULT '0',
  `status` int NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- products
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description_ru` varchar(255) DEFAULT NULL,
  `sku_id` int DEFAULT NULL,
  `price` int NOT NULL,
  `costs` int NOT NULL,
  `status` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `menu_id` int NOT NULL,
  `company_id` int NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- SKU (Stock Keeping Unit)
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `title_ru` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `description_ru` varchar(255) DEFAULT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL,
  `client_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `client_employee_id` int NOT NULL,
  `status` int NOT NULL,
  `date` datetime NOT NULL,
  `total` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- order_items
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE `order_items` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `sku_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `costs` int NOT NULL,
  `total` int NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- media
DROP TABLE IF EXISTS `media`;
CREATE TABLE `media` (
  `id` int NOT NULL,
  `image_name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `client_id` int NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'image',
  `status` int NOT NULL DEFAULT '1',
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- payments
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `client_id` int NOT NULL,
  `vendor_id` int NOT NULL,
  `client_employee_id` int NOT NULL,
  `status` int NOT NULL,
  `date` datetime NOT NULL,
  `total` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  primary key(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- invoice
DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
	`id` int NOT NULL,
	`number` int NOT NULL,
	`date` datetime NOT NULL,
	`client_id` int NOT NULL,
	`vendor_id` int NOT NULL,
	`order_items_id` int NOT NULL,
	`total` int NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;