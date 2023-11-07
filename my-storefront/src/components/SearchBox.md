Component: `SearchBox`

### What it is:
`SearchBox` is a React functional component that provides an input field for users to search for products by typing.

### How to use it:

1. **Import the component** in the file where you want to include a search box:
   ```tsx
   import SearchBox from './components/SearchBox';
   ```

2. **Use the `<SearchBox>` component** within your JSX, providing the necessary props:
   ```tsx
   <SearchBox
     setSearchTerm={handleSearchTermChange}
   />
   ```

### Props:

- `setSearchTerm`: A function that updates the search term state in the parent component, typically passed down as a prop.

### Internal Logic:

- Uses an input element of type `text`.
- The `onChange` event listener is set to invoke the `setSearchTerm` function with the current value of the input field whenever the user types in the search box.

### Styling:

- There is no explicit styling provided within the component, which means it will inherit the styles from its parent or global styles unless styled directly where it's used or through a stylesheet.

### Accessibility:

- The input field does not have an associated label, which could be an accessibility concern. To improve accessibility, a label could be added or an `aria-label` attribute could be used.
- The placeholder provides a hint to the user on what the input field is for, which enhances usability.

### User Interaction:

- As the user types into the search box, the `setSearchTerm` function is called with the new value, allowing the parent component to filter or search products based on the input.
