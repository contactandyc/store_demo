In an Express framework, you'd set up a route that handles a GET request to fetch sales data over time. Here's what the REST API endpoint might look like:

```javascript
const express = require('express');
const router = express.Router();
const db = require('./db'); // assume you have a module to handle database operations

// GET sales data over time
router.get('/sales-over-time', async (req, res) => {
  try {
    // Perform the SQL query to fetch sales data
    const result = await db.query(`
      SELECT sale_date, SUM(sale_amount) as total_sales
      FROM sales
      GROUP BY sale_date
      ORDER BY sale_date;
    `);

    // Send the result back in the response
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error while retrieving sales data.');
  }
});

module.exports = router;
```

In the `db` module (which you should create according to your needs), you would set up the database connection and a method to perform queries, such as:

```javascript
// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'username',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

And in your main `app.js` (or wherever you set up your express application), you would use this router:

```javascript
const express = require('express');
const salesRouter = require('./salesRouter'); // path to your sales router file

const app = express();

app.use('/api', salesRouter);

// other app.use() calls for middleware, other routers, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Now, when you make a GET request to `/api/sales-over-time`, the Express server will respond with the sales data aggregated over time.

A RESTful API is characterized by certain principles and standards that govern its design. The path `/api/sales-over-time` is considered RESTful for several reasons:

1. **Resource Naming**: The path segments `/api/sales-over-time` use nouns (`sales`) which refer to the resource (sales data) and not actions or verbs, which is a RESTful practice. The phrase `over-time` implies a dimension of the data, which in this case is a time series.

2. **Statelessness**: Each call to a RESTful API contains all of the information the server needs to fulfill the request. The server does not need to remember previous interactions.

3. **Method Definition**: RESTful APIs use HTTP methods (GET, POST, PUT, DELETE, etc.) to perform operations on resources. In this case, `GET` is used to retrieve sales data, which is the correct operation for fetching data without side effects (idempotent).

4. **Standard HTTP Codes**: RESTful APIs use standard HTTP response codes to indicate the result of an operation (e.g., 200 for success, 404 for not found, 500 for server error).

5. **Endpoint Path**: The endpoint `/api/sales-over-time` implies that it is part of an API (due to the `/api` prefix) and it suggests that it's an operation to get sales data aggregated over time.

6. **Client-Server Architecture**: The client making a request and the server handling it are independent, with the server providing a service that the client can consume.

7. **Uniform Interface**: A RESTful API has a uniform interface which aids in decoupling the client and server. This makes it easier to scale and modify the server-side components without affecting the client's ability to operate.

8. **Layered System**: REST allows for a layered system architecture where client cannot ordinarily tell whether it is connected directly to the end server, or to an intermediary along the way.

9. **Code on Demand (optional)**: Servers can temporarily extend or customize the functionality of a client by transferring executable code.

In summary, the path `/api/sales-over-time` follows RESTful principles by structuring the URL in a logical, resource-oriented manner and by being paired with an HTTP method that defines the action to be performed.