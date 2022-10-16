CREATE DATABASE IF NOT EXISTS db_node24;

USE IF EXISTS db_node24;

-- DROP ALL TABLES --
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS sub_foods;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS food_type;
DROP TABLE IF EXISTS like_res;
DROP TABLE IF EXISTS rate_res;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS users;

-- CREATE TABLE --
-- USER --
CREATE TABLE IF NOT EXISTS users (
	user_id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(255),
	email VARCHAR(255),
	`password` VARCHAR(255)
);

-- RESTAURANT --
CREATE TABLE IF NOT EXISTS restaurants (
	res_id INT AUTO_INCREMENT PRIMARY KEY,
	res_name VARCHAR(255),
	image VARCHAR(255),
	`desc` VARCHAR(255)
);

-- RATE RES --
CREATE TABLE IF NOT EXISTS rate_res (
	user_id INT,
	res_id INT,
	amount INT,
	date_rate DATETIME,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
);

-- LIKE RES --
CREATE TABLE IF NOT EXISTS like_res (
	user_id INT,
	res_id INT,
	date_like DATETIME,
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (res_id) REFERENCES restaurants(res_id)
);

-- FOOD TYPE --
CREATE TABLE IF NOT EXISTS food_type (
	type_id INT AUTO_INCREMENT PRIMARY KEY,
	type_name VARCHAR(255)
);

-- FOOD --
CREATE TABLE IF NOT EXISTS foods (
	food_id INT AUTO_INCREMENT PRIMARY KEY,
	food_name VARCHAR(255),
	image VARCHAR(255),
	price FLOAT,
	`desc` VARCHAR(255),
	type_id INT,
	FOREIGN KEY (type_id) REFERENCES food_type(type_id)
);

--  SUB FOOD --
CREATE TABLE IF NOT EXISTS sub_foods (
	sub_id INT AUTO_INCREMENT PRIMARY KEY,
	sub_name VARCHAR(255),
	sub_price FLOAT,
	food_id INT,
	FOREIGN KEY (food_id) REFERENCES foods(food_id)
);

-- ORDER --
CREATE TABLE IF NOT EXISTS orders (
	user_id INT,
	food_id INT,
	amount INT,
	`code` VARCHAR(255),
	arr_sub_id VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES users(user_id),
	FOREIGN KEY (food_id) REFERENCES foods(food_id)
);

