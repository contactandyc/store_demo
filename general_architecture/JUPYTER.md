To connect your Jupyter Notebook to a PostgreSQL database and make reports, follow these steps:

1. **Install Required Libraries:**
   Ensure that you have `ipython-sql`, `sqlalchemy`, and `psycopg2` (or `psycopg2-binary`) installed in your Python environment. You can install them using pip:

   ```sh
   pip install ipython-sql sqlalchemy psycopg2-binary
   ```

2. **Load SQL Extension:**
   In your Jupyter Notebook, load the SQL extension by running the following magic command:

   ```python
   %load_ext sql
   ```

3. **Create Database Connection String:**
   Create a connection string with the format:

   ```python
   postgresql://username:password@hostname:port/database
   ```

   Replace `username`, `password`, `hostname`, `port`, and `database` with your PostgreSQL credentials and database details.

4. **Establish Connection:**
   Use the connection string to connect to your PostgreSQL database:

   ```python
   %sql postgresql://username:password@hostname:port/database
   ```

5. **Run Queries:**
   You can now run SQL queries directly in your Jupyter Notebook by prefixing them with the `%sql` magic command for single-line queries or `%%sql` for multi-line queries:

   ```python
   %sql SELECT * FROM your_table LIMIT 5
   ```

   Or for multi-line:

   ```python
   %%sql
   SELECT *
   FROM your_table
   WHERE condition = 'value'
   LIMIT 5
   ```

6. **Use Pandas for Reporting:**
   To make reports, fetch data into a pandas DataFrame. You can use the `read_sql_query` function from pandas:

   ```python
   import pandas as pd
   from sqlalchemy import create_engine

   # Create an engine instance
   alchemyEngine = create_engine('postgresql://username:password@hostname:port/database', pool_recycle=3600);

   # Connect to PostgreSQL server
   dbConnection = alchemyEngine.connect();

   # Read data from PostgreSQL database table and load into a DataFrame instance
   df = pd.read_sql("select * from \"your_table\"", dbConnection);

   pd.set_option('display.expand_frame_repr', False);

   # Print the DataFrame
   print(df);

   # Close the database connection
   dbConnection.close();
   ```

7. **Generate Reports:**
   Once you have the data in pandas DataFrames, you can use pandas methods such as `.groupby()`, `.pivot_table()`, and others to manipulate the data and produce summaries. Visualization can be done using libraries such as `matplotlib`, `seaborn`, or `plotly`.

For example:

```python
import matplotlib.pyplot as plt
# Generate a simple plot
df.groupby('your_column')['another_column'].sum().plot(kind='bar')
plt.show()
```

Remember to replace `'your_column'` and `'another_column'` with actual column names from your dataset. This is a simple example to illustrate the process; your actual reports will likely be more complex and might involve combining data from multiple tables, performing statistical analysis, and creating more sophisticated visualizations.