CREATE DATABASE IF NOT EXISTS db_node24;

USE IF EXISTS db_node24;

-- RESET TABLE --
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS photo_tags;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS users;


-- CREATE USERS TABLE --
CREATE TABLE IF NOT EXISTS users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	created_at DATE
);

-- ADD USERS DATA --
INSERT INTO users (username, created_at)
		VALUES
			('Oscar Hewitt', '2002-12-29'),
			('Jesse Schmidt', '2009-07-09'),
			('Leonard Kinney', '2009-12-25'),
			('Illiana Stanley', '2005-04-21'),
			('Kennan Thomas', '2009-04-04'),
			('Lynn Huffman', '2006-03-30'),
			('Orson Gallegos', '2004-03-01'),
			('Plato Trevino', '2005-12-13'),
			('Timothy Bird', '2005-07-07'),
			('Ruth Mcmillan', '2009-09-04');

-- CREATE FOLLOWS TABLE --
CREATE TABLE IF NOT EXISTS follows (
	follower_id INT,
	followee_id INT,
	created_at DATE,
	FOREIGN KEY (follower_id) REFERENCES users(id),
	FOREIGN KEY (followee_id) REFERENCES users(id)
);

-- ADD FOLLOWS DATA --
INSERT INTO follows (follower_id, followee_id, created_at)
		VALUES
			(4, 6, '2015-04-20'),
			(2, 3, '2018-07-01'),
			(4, 7, '2021-11-29'),
			(7, 9, '2021-11-12'),
			(6, 5, '2020-03-31'),
			(7, 8, '2013-03-29'),
			(8, 1, '2017-10-10'),
			(1, 2, '2014-01-01'),
			(6, 3, '2012-05-20'),
			(4, 10, '2014-04-30');

-- CREATE TAGS TABLE --
CREATE TABLE IF NOT EXISTS tags (
	id INT AUTO_INCREMENT PRIMARY KEY,
	tag_name VARCHAR(255),
	created_at DATE
);

-- ADD TAGS DATA --
INSERT INTO tags (tag_name, created_at)
		VALUES
			('Aenean', '2016-08-26'),
			('risus.', '2016-06-12'),
			('posuere', '2016-08-29'),
			('libero', '2016-06-19'),
			('ornare', '2015-12-02'),
			('sit', '2016-01-30'),
			('condimentum.', '2016-01-15'),
			('sagittis', '2015-10-20'),
			('elit,', '2016-08-28'),
			('nisi.', '2016-01-16');

-- CREATE PHOTOS TABLE --
CREATE TABLE IF NOT EXISTS photos (
	id INT AUTO_INCREMENT PRIMARY KEY,
	image_url VARCHAR(255),
	user_id int,
	created_at DATE,
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ADD PHOTOS DATA --
INSERT INTO photos (image_url, user_id, created_at)
		VALUES
			('https://picsum.photos/600', 6, '2017-10-23'),
			('https://picsum.photos/600', 4, '2018-06-02'),
			('https://picsum.photos/600', 9, '2019-05-02'),
			('https://picsum.photos/600', 9, '2018-06-03'),
			('https://picsum.photos/600', 10, '2018-05-24'),
			('https://picsum.photos/600', 8, '2018-02-17'),
			('https://picsum.photos/600', 6, '2018-01-25'),
			('https://picsum.photos/600', 7, '2018-04-19'),
			('https://picsum.photos/600', 7, '2018-05-10'),
			('https://picsum.photos/600', 5, '2017-11-29');

-- CREATE PHOTO TAGS TABLE --
CREATE TABLE IF NOT EXISTS photo_tags (
	photo_id INT,
	tag_id INT,
	FOREIGN KEY (photo_id) REFERENCES photos(id),
	FOREIGN KEY (tag_id) REFERENCES tags(id)
);

-- ADD PHOTO TAGS DATA --
INSERT INTO photo_tags (photo_id, tag_id)
		VALUES
			(6, 5),
			(9, 8),
			(2, 10),
			(8, 3),
			(5, 2),
			(5, 10),
			(4, 8),
			(3, 3),
			(7, 7),
			(2, 5);

-- CREATE LIKES TABLE --
CREATE TABLE IF NOT EXISTS likes (
	photo_id INT,
	user_id INT,
	created_at DATE,
	FOREIGN KEY (photo_id) REFERENCES photos(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ADD LIKES DATA --
INSERT INTO likes (photo_id, user_id, created_at)
		VALUES
			(5, 9, '2022-06-26'),
			(3, 5, '2022-05-27'),
			(6, 6, '2022-06-26'),
			(1, 1, '2021-11-27'),
			(5, 4, '2022-02-02'),
			(5, 10, '2022-05-30'),
			(6, 5, '2022-02-06'),
			(9, 5, '2022-08-05'),
			(5, 2, '2022-01-28'),
			(9, 4, '2022-07-16');
		
-- CREATE COMMENTS TABLE --
CREATE TABLE IF NOT EXISTS comments (
	id INT AUTO_INCREMENT PRIMARY KEY, 
	comment_text VARCHAR(255),
	user_id INT,
	photo_id INT,
	created_at DATE,
	FOREIGN KEY (photo_id) REFERENCES photos(id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ADD comments DATA --
INSERT INTO comments (comment_text, user_id, photo_id, created_at)
		VALUES
			('volutpat ornare, facilisis', 2, 3, '2022-03-13'),
			('mi tempor lorem, eget mollis', 2, 8, '2021-10-27'),
			('ipsum porta elit, a feugiat tellus lorem', 3, 9, '2022-09-27'),
			('dapibus ligula. Aliquam erat', 8, 4, '2022-03-27'),
			('egestas lacinia. Sed congue,', 5, 9, '2022-02-09'),
			('Aenean gravida', 4, 8, '2022-06-03'),
			('leo. Morbi', 6, 4, '2022-10-08'),
			('Donec consectetuer mauris id sapien.', 3, 7, '2022-02-03'),
			('nec, leo. Morbi neque tellus,', 3, 6, '2022-01-23'),
			('porttitor tellus non magna. Nam ligula elit,', 9, 2, '2022-07-22');


