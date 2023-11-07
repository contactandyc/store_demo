import csv
import random
from faker import Faker
import datetime
import numpy as np

# Define start and end dates as datetime objects
start_date = datetime.datetime(2022, 1, 1)
end_date = datetime.datetime(2023, 1, 1)

# Compute the difference between end and start dates
time_between_dates = end_date - start_date

def generate_random_date():
    # Generate a random number of days to add to the start date
    random_number_of_days = random.randrange(time_between_dates.days)

    # Create the random date
    return start_date + datetime.timedelta(days=random_number_of_days)

allowance = 2000

order_items = []
orders = []

# Function to generate random order_items
def generate_order_items(products, counts, payment_method_id, user_id, order_date):
    total_price = 0.0
    num_order_items = len(counts)

    for product_id, quantity in counts.items():
        product = products[product_id]
        price_at_time_of_order = float(product['price'])
        discount_amount = 0
        discount_reason = ''

        total_price = total_price + (price_at_time_of_order * quantity)

        order_item = {
            'id': len(order_items)+1,
            'order_id': len(orders)+1,
            'product_id': product['id'],
            'quantity': quantity,
            'price_at_time_of_order': price_at_time_of_order,
            'discount_amount': discount_amount,
            'discount_reason': discount_reason,
        }
        order_items.append(order_item)

    order = {
        'id': len(orders)+1,
        'user_id': user_id,
        'payment_method_id': payment_method_id,
        'order_date': order_date.strftime("%Y-%m-%d %H:%M:%S"),
        'total_amount': total_price,
        'status': 'shipped',
    }
    orders.append(order)

# Initialize an empty dictionary to store products by merchant_id
products_by_merchant = {}

# Read the CSV file
with open('data/merchant_products.csv', mode='r') as products_file:
    reader = csv.DictReader(products_file)
    for row in reader:
        # Extract relevant product information
        product_id = int(row['id'])
        image = row['image']
        image_id = int(row['image_id'])
        name = row['name']
        description = row['description']
        price = float(row['price'])
        merchant_id = int(row['merchant_id'])

        # Create a product dictionary
        product = {
            'id': product_id,
            'image': image,
            'image_id': image_id,
            'name': name,
            'description': description,
            'price': price,
        }

        # Check if the merchant_id already exists in the dictionary
        if merchant_id in products_by_merchant:
            products_by_merchant[merchant_id].append(product)
        else:
            # If not, create a new entry for the merchant_id
            products_by_merchant[merchant_id] = [product]

merchant_ids_by_user = {}

# Read the CSV file
with open('data/payment_methods.csv', mode='r') as users_file:
    reader = csv.DictReader(users_file)
    for row in reader:
        # Extract relevant information
        merchant = {
            'payment_method_id': int(row['id']),
            'merchant_id': int(row['merchant_id']),
        }

        user_id = int(row['user_id'])

        if user_id in merchant_ids_by_user:
            merchant_ids_by_user[user_id].append(merchant)
        else:
            merchant_ids_by_user[user_id] = [merchant]

def softmax(x):
    e_x = np.exp(x - np.max(x))  # Subtract max to prevent overflow
    return e_x / e_x.sum()

for user_id,merchants in merchant_ids_by_user.items():
    random_array = np.random.rand(len(merchants)) # random numbers between 0 and 1
    random_array = random_array + 0.2 # make sure all merchants get something
    random_array = softmax(random_array) # sum will now be 1.0

    # now spend up to allowance
    money_left = allowance
    extra = 0.0
    for index, value in enumerate(random_array):
        budget_for_merchant = (value*money_left) + extra
        # find merchant
        merchant = merchants[index]
        products = products_by_merchant[merchant['merchant_id']]
        counts = {}
        while budget_for_merchant > 0:
            # choose a random product
            product_index = random.randint(0, len(products) - 1)
            product = products[product_index]
            if product['price'] > budget_for_merchant:
                break
            budget_for_merchant -= product['price']
            if product_index in counts:
                counts[product_index] += 1
            else:
                counts[product_index] = 1
        extra = budget_for_merchant

        generate_order_items(products, counts, merchant['payment_method_id'], user_id, generate_random_date())

# Write orders CSV
with open('data/orders.csv', mode='w', newline='') as orders_file:
    fieldnames = ['id', 'user_id', 'payment_method_id', 'order_date', 'total_amount', 'status']
    writer = csv.DictWriter(orders_file, fieldnames=fieldnames)
    writer.writeheader()
    for order in orders:
        writer.writerow(order)

# Write order_items CSV
with open('data/order_items.csv', mode='w', newline='') as order_items_file:
    fieldnames = ['id', 'order_id', 'product_id', 'quantity', 'price_at_time_of_order', 'discount_amount', 'discount_reason']
    writer = csv.DictWriter(order_items_file, fieldnames=fieldnames)
    writer.writeheader()
    for order_item in order_items:
        writer.writerow(order_item)
