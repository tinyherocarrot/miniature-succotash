DROP TABLE IF EXISTS Connections;

USE qlink_db;

# Create the users table
CREATE TABLE Connections (
  connection_id INT NOT NULL AUTO_INCREMENT,
  initiator_id INT NOT NULL,
  receiver_id INT NOT NULL,
  stamp_updated timestamp default now() on update now(),

  PRIMARY KEY (connection_id)
);