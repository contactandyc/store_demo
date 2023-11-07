DROP TABLE IF EXISTS merchants CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_history CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE merchants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20)
);

CREATE TABLE user_history (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    user_id INT REFERENCES users(id)
);

CREATE TABLE payment_methods (
    id SERIAL PRIMARY KEY,
    name_on_card VARCHAR(100),
    card_number VARCHAR(19),
    expiration_date DATE,
    cvv SMALLINT,
    merchant_id INT REFERENCES merchants(id),
    user_id INT REFERENCES users(id)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255),
    image_id SMALLINT,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    merchant_id INT REFERENCES merchants(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    order_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50), -- for example: 'pending', 'completed', 'shipped', etc.
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (payment_method_id) REFERENCES payment_methods(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_time_of_order DECIMAL(10, 2) NOT NULL,
    discount_amount DECIMAL(10, 2) DEFAULT 0.00,
    discount_reason VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

\copy merchants FROM 'data/merchants.csv' WITH (FORMAT csv, HEADER);
\copy users FROM 'data/users.csv' WITH (FORMAT csv, HEADER);
\copy user_history FROM 'data/user_history.csv' WITH (FORMAT csv, HEADER);
\copy payment_methods FROM 'data/payment_methods.csv' WITH (FORMAT csv, HEADER);
\copy products FROM 'data/merchant_products.csv' WITH (FORMAT csv, HEADER);
\copy orders FROM 'data/orders.csv' WITH (FORMAT csv, HEADER);
\copy order_items FROM 'data/order_items.csv' WITH (FORMAT csv, HEADER);
