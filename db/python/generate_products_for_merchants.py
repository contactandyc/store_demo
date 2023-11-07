import csv
import random

# Function to generate a random price within the range
def random_price(min_price, max_price):
    return round(random.uniform(min_price, max_price), 2)

# Generate the products for each store
def generate_products(num_stores, product_offerings, filename):
    with open(filename, mode='w', newline='') as file:
        fieldnames = ['id', 'image', 'image_id', 'name', 'description', 'price', 'merchant_id']
        writer = csv.DictWriter(file, fieldnames=fieldnames)

        writer.writeheader()
        product_id = 1

        for store_id in range(1, num_stores + 1):
            num_products = random.randint(10, 25)  # Random number of products for each store
            unique_products = random.sample(range(1, len(product_offerings)), num_products)

            for product_idx in unique_products:
                product = product_offerings[product_idx]
                image = product['image']
                image_id = random.randint(0, 3)
                if image[-1] == '_':
                    image_id = random.randint(0, 1)
                writer.writerow({
                    'id': product_id,
                    'image': product['image'],
                    'image_id': image_id,
                    'name': product['name'],
                    'description': product['description'],
                    'price': random_price(float(product['min_price']), float(product['max_price'])),
                    'merchant_id': store_id
                })
                product_id += 1

# Read the product offerings from the CSV file and store them in a list
product_offerings_list = []
with open('data/input/products.csv', mode='r', newline='') as products_file:
    product_reader = csv.DictReader(products_file)
    for row in product_reader:
        product_offerings_list.append(row)

# Generate the CSV file with the list of product offerings
generate_products(20, product_offerings_list, 'data/merchant_products.csv')
print('data/merchant_products.csv file has been created.')
