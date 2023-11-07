import csv
from datetime import datetime

# The path to the input CSV file
input_csv_path = 'data/input/users.csv'

# The paths to the output CSV files
output_users_csv_path = 'data/users.csv'
output_user_history_csv_path = 'data/user_history.csv'

# Current timestamp in the PostgreSQL timestamp with time zone format
current_timestamp = datetime.utcnow().isoformat()

# Read the input CSV and write to the users and user_history CSV files
with open(input_csv_path, mode='r', newline='') as infile, \
     open(output_users_csv_path, mode='w', newline='') as users_file, \
     open(output_user_history_csv_path, mode='w', newline='') as user_history_file:

    reader = csv.DictReader(infile)
    users_writer = csv.writer(users_file)
    user_history_writer = csv.writer(user_history_file)

    # Write the headers for the users and user_history CSV files
    users_writer.writerow(['id', 'created_at', 'updated_at', 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code'])
    user_history_writer.writerow(['id', 'created_at', 'first_name', 'last_name', 'address', 'city', 'state', 'zip_code', 'user_id'])

    for row in reader:
        # Write a row to the users CSV file
        users_writer.writerow([
            row['id'], current_timestamp, current_timestamp,
            row['first_name'], row['last_name'], row['address'],
            row['city'], row['state'], row['zip_code']
        ])

        # Write a corresponding row to the user_history CSV file
        user_history_writer.writerow([
            row['id'], current_timestamp,
            row['first_name'], row['last_name'], row['address'],
            row['city'], row['state'], row['zip_code'],
            row['id']  # Assuming the user_id is the same as id for this example
        ])

print(f"CSV files '{output_users_csv_path}' and '{output_user_history_csv_path}' have been created.")
