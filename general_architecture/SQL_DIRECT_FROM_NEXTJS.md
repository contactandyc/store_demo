# Note

In general, sql should be called through an API in express.  However, it is efficient to directly call postgres and then move the call to an API RESTful call.

# SQL in NextJS as API route

To fetch data from a PostgreSQL database and expose it through a Next.js API route, you need to do the following:

1. **Set up a PostgreSQL client**: Use a PostgreSQL client like `pg` to connect to your database.

2. **Create a Next.js API Route**: Set up an API route in the `pages/api` directory that connects to the database and fetches the required data.

3. **Use `getServerSideProps` or `getInitialProps`**: Since you're fetching data from a database, which requires server-side execution, you should use `getServerSideProps` instead of `getStaticProps` for dynamic data fetching.

Let's set up an example API route to fetch products from your PostgreSQL database.

### Step 1: Install PostgreSQL client
Install the `pg` package by running:
```bash
npm install pg
```

### Step 2: Create a database utility file
Create a file called `db.ts` where you will configure and export the PostgreSQL client.

```typescript
// utils/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'store_demo',
  password: 'your_db_password',
  port: 5432,
});

export default pool;
```

### Step 3: Create the API Route

In the `pages/api/products.ts` file, connect to the database and create an endpoint to fetch products.

```typescript
// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { rows } = await pool.query('SELECT * FROM products');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
```

### Step 4: Update your Next.js page

Use `getServerSideProps` to fetch data from your API route when the page is requested.

```typescript
// pages/index.tsx or the relevant page
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch('http://localhost:3000/api/products');
  const products = await response.json();
  return { props: { products } };
};

// ... rest of your component
```

Remember to replace `'http://localhost:3000/api/products'` with your actual domain if your application is deployed.

### Security Considerations:

- **Environment Variables**: Use environment variables to store your database credentials and access them in your application (`process.env.YOUR_VARIABLE`).
- **Connection Pooling**: The `pg` library supports connection pooling which is already used in the example (`new Pool()`). This is important for efficiently managing connections.
- **Input Validation**: Always validate and sanitize inputs to your API endpoints to protect against SQL injection and other malicious attacks.
- **Error Handling**: Never expose sensitive error details to the client. Always log these on the server and return generic error messages to the client.
- **Authentication and Authorization**: Ensure that your API routes are protected with proper authentication and authorization checks.

By following these steps, you'll be able to set up a Next.js API route to fetch data from your local PostgreSQL database and consume it within your Next.js application.