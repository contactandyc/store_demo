# Postgres setup for store demo

1.  Install postgres (see [MAC_INSTALL.md](MAC_INSTALL.md)) 
2.  Generate data if desired
```bash
python python/generate_user_files.py
python python/generate_payment_methods.py
python python/generate_products_for_merchants.py
python python/generate_random_orders.py
```
3. Create store_demo database and add tables
```bash
createdb store_demo
psql store_demo < create_tables.sql 
```
