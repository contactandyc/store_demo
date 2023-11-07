To install PostgreSQL on your Mac, you can use Homebrew, which is a popular package manager for macOS. If you don't have Homebrew installed, you can install it by pasting the installation command from the Homebrew website into your terminal.

Here’s how you can install PostgreSQL using Homebrew:

1. Open the Terminal app.
2. First, update Homebrew to the latest version:

   ```
   brew update
   ```

3. Install PostgreSQL with Homebrew:

   ```
   brew install postgresql
   ```

4. Once the installation is complete, you can start the PostgreSQL service:

   ```
   brew services start postgresql
   ```

5. To check that PostgreSQL has been installed and is running, you can use the following command:

   ```
   postgres --version
   ```

6. Optionally, you can create your database cluster with `initdb`, although Homebrew usually does this for you:

   ```
   initdb /usr/local/var/postgres
   ```

7. To create a new database and start using PostgreSQL, you can use the `createdb` command:

   ```
   createdb <database_name>
   ```

8. Connect to PostgreSQL using the `psql` utility:

   ```
   psql <database_name>
   ```

If you encounter any issues with the Homebrew installation, ensure that your Homebrew is set up correctly and that your system has the necessary command line tools installed.

Remember, if you ever want to stop the PostgreSQL service, you can do so with:

```
brew services stop postgresql
```

For different versions of macOS, you may need additional dependencies or face permission issues; if that happens, error messages typically include hints on how to resolve them, or you can consult the official PostgreSQL documentation or Homebrew guides for further assistance.
