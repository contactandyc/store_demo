Utility Function: `highlightText`

### What it is:
- A function that returns text with specific terms highlighted.

### Functionality:
- Escapes all regular expression special characters in the `searchTerm` to prevent regex syntax errors.
- Splits the search term into individual words and creates a regex that matches any of those words, case-insensitive.
- Splits the input `text` into parts that match and do not match the regex.
- Constructs a JSX element containing the text, with matches wrapped in a `span` with a `highlightText` class.

### Parameters:
- `text`: The body of text within which to highlight search terms.
- `searchTerm`: The word or phrase to highlight within the text.

### Returns:
- A JSX element containing the input text with the search term highlighted.

### Usage:
- This utility is used to visually distinguish search terms within a body of text, usually in the context of search results or text filtering.

### Considerations:
- The function assumes that `text` and `searchTerm` are non-null strings.
- The highlighting is case-insensitive because of the `'gi'` flags in the regex.

### Best Practices:
- Ensure that user-inputted search terms are sanitized before being passed to prevent XSS (Cross-Site Scripting) attacks if the text is rendered in a web application.
- Use a unique `key` for each element in the returned array to prevent React key warnings and improve rendering performance.
- The `highlightText` class used in the JSX should be defined in CSS to apply the desired highlighting style.
