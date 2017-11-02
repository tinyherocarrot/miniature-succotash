CREATE DATABASE IF NOT EXISTS qlink_db;
USE qlink_db;

DROP TABLE IF EXISTS Users;


# Create the users table
CREATE TABLE Users (
  user_id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(80) NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  user_password CHAR(41) NOT NULL,
  city VARCHAR(30),
  bio TEXT NULL,
  skills TEXT NULL,

  organization VARCHAR(50),
  role VARCHAR(50),
  linkedin VARCHAR(50),
  twitter VARCHAR(50),
  other_website VARCHAR(50),
  user_photo VARCHAR(100)

  PRIMARY KEY (user_id),
  UNIQUE INDEX (email)
)