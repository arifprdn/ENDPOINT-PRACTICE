CREATE DATABASE endpoint;

CREATE TABLE customers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(13) NOT NULL,
    is_active BOOLEAN NOT NULL
);


--INSERT INTO customers (name,email,phone_number,is_active) VALUES ('Putin','putin@gmail.com','082121213333',true);