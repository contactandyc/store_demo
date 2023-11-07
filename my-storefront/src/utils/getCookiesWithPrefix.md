Utility Function: `getCookiesWithPrefix`

### What it is:
A utility function designed to retrieve all cookies that have names starting with a specific prefix from the document's cookie string.

### Functionality:
- Retrieves the entire cookie string from the document and splits it into individual cookies using a semicolon as the separator.
- Iterates through each cookie and trims whitespace to ensure accurate matching.
- Checks for the specified prefix at the start of each cookie name.
- For cookies with the matching prefix, separates the name and value by splitting the string at the equals sign.
- Decodes the cookie value to handle URL-encoded characters and ensure the value is in a human-readable format.
- Accumulates matching cookies in an object, with cookie names as keys and their decoded values as values.

### Parameters:
- `prefix`: A string representing the prefix used to filter cookie names.

### Returns:
- An object mapping each cookie name that matches the prefix to its corresponding decoded value.

### Usage:
This function is particularly useful when dealing with a large number of cookies and there is a need to find all cookies related to a specific module or component within an application, distinguished by a unique prefix.

### Code Walkthrough:
Here's a step-by-step explanation of the code:

```javascript
export function getCookiesWithPrefix(prefix: string): { [cookieName: string]: string } {
  // Split the document.cookie string on each semicolon to get an array of cookies
  const cookies = document.cookie.split(';');
  
  // Prepare an object to hold cookies with names that match the prefix
  const matchingCookies: { [cookieName: string]: string } = {};

  // Iterate through each cookie in the array
  for (let i = 0; i < cookies.length; i++) {
    // Trim leading and trailing whitespace from the cookie string
    const cookie = cookies[i].trim();
    
    // Check if the cookie's name starts with the specified prefix
    if (cookie.startsWith(prefix)) {
      // Split the cookie on the equals sign to separate its name and value
      const [name, value] = cookie.split('=');
      
      // Decode the cookie's value and store it in the matchingCookies object under the cookie's name
      matchingCookies[name] = decodeURIComponent(value);
    }
  }

  // Return the object containing all matching cookies
  return matchingCookies;
}
```

### Considerations:
- Assumes proper formatting and encoding of the document's cookies.
- Does not differentiate between cookies with the same name under different paths or domains.

### Best Practices:
- Maintain unique names for cookies across paths and domains to prevent conflicts.
- Use this function where necessary to access cookies, being aware of security best practices.
- Consider setting sensitive cookies as HttpOnly to prevent them from being accessed through client-side scripts.
