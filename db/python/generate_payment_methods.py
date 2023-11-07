import csv
import random

# Open the user and card CSV files
with open('data/input/users.csv', mode='r', newline='') as users_file, \
     open('data/input/cards.csv', mode='r', newline='') as cards_file, \
     open('data/payment_methods.csv', mode='w', newline='') as payment_methods_file:

    # Create DictReader objects
    user_reader = csv.DictReader(users_file)
    card_reader = csv.DictReader(cards_file)

    # Define the fieldnames for the new CSV file
    fieldnames = ['id', 'name_on_card', 'card_number', 'expiration_date', 'cvv', 'merchant_id', 'user_id' ]

    # Create a DictWriter object
    payment_methods_writer = csv.DictWriter(payment_methods_file, fieldnames=fieldnames)

    # Write the header to the new CSV file
    payment_methods_writer.writeheader()

    # Create a dictionary of users with their IDs as keys
    users = {int(row['id']): row for row in user_reader}

    payment_method_id = 1


    # Iterate through each card and write to the new CSV file
    for card in card_reader:
        user_id = int(card['id'])
        expiration_date = card['expiration_date']
        if len(expiration_date) == 7:  # YYYY-MM format
            expiration_date += '-01'  # Append '-01' to make it YYYY-MM-DD
        card['expiration_date'] = expiration_date

        user = users.get(user_id, {})
        if user:
            unique_merchants = random.sample(range(1, 21), random.randint(1, 10))
            for merchant_id in unique_merchants:
                payment_methods_writer.writerow({
                    'id': payment_method_id,
                    'name_on_card': f"{user['first_name']} {user['last_name']}",
                    'card_number': card['card_number'],
                    'expiration_date': card['expiration_date'],
                    'cvv': card['cvv'],
                    'user_id': user_id,
                    'merchant_id': merchant_id
                })
                payment_method_id = payment_method_id + 1

print("data/payment_methods.csv file has been created.")
