Utility Function: `parseCSV`

### What it is:
- A function that asynchronously parses a CSV-formatted string into an array of objects.

### Functionality:
- Uses the `csv-parser` library to parse CSV content.
- Reads the CSV content line by line, emitting 'data' events for each row parsed.
- Collects each row into an array, with each row represented as an object (`CSVRow`).
- Resolves the promise with the collected array once the entire CSV content is parsed.
- Rejects the promise if an error occurs during parsing.

### Parameters:
- `csvContent`: A string containing the CSV data to be parsed.

### Returns:
- A promise that resolves to an array of `CSVRow` objects where each object represents a row in the CSV, with key-value pairs corresponding to column headers and cell data.

### Usage:
- This utility is used to convert CSV data into a more manageable and accessible JavaScript structure, typically for further processing or display in a UI.

### Considerations:
- The CSV data is assumed to be well-formed according to the CSV standard.
- Error handling is important, as malformed CSV content could result in a rejected promise.

### Best Practices:
- Validate and sanitize the input `csvContent` to prevent injection attacks, especially if the source of the CSV data is untrusted.
- The function is asynchronous, so be sure to handle the promise correctly, using `await` with `try/catch` or `.then()` with `.catch()` chaining.
- Since this function may take time for large CSV files, consider the performance impact and avoid blocking the main thread in a UI application.
