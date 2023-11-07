Utility File: `db.ts`

### What it is:
- A configuration file to set up a PostgreSQL connection pool using the `pg` library.

### Functionality:
- Instantiates a new `Pool` object from the `pg` library with a connection configuration for the PostgreSQL database.

### Configuration:
- Host: `localhost` - Database server host.
- Database: `store_demo` - The specific database to connect to.
- Port: `5432` - The port on which the PostgreSQL server is running.

### Usage:
- This pool is to be used throughout the application to run queries against the PostgreSQL database.
- By using a pool, the application reuses a set of connections, which is more efficient than opening a new connection for each query.

### Export:
- Exports the configured pool as the default export, so it can be easily imported and used in other parts of the application.

### Considerations:
- Credentials like user and password are not included, assuming default PostgreSQL authentication; in a production environment, these should be securely provided.
- Host and database values are hardcoded, which is typical for a local development environment. For production, these should be replaced with environment variables or a configuration file.
- There's no error handling or connection validation logic shown, which would be important for ensuring that the application can handle database connectivity issues gracefully.

### Best Practices:
- For production, use environment variables for sensitive information such as host, database name, port, user, and password.
- Implement error handling around the pool to manage database downtime or connectivity issues.
- Might want to include connection timeout settings and pool size based on the expected load.
