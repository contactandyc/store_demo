Page Component: `merchants/[merchant_id].tsx` (Individual Merchant Page)

### What it is:
A Next.js page that displays all products from a specific merchant, allowing users to search and filter products.

### Data Fetching:
- Uses `getServerSideProps` for server-side rendering, fetching merchant-specific products on each request.
- Fetches data from two endpoints: one for products by `merchant_id` and one for merchant details.

### Props:
- Receives `products`, `merchantName`, and `merchantId` as props.

### State:
- Uses `useState` to handle `searchTerm` for filtering products.

### User Interaction:
- Allows users to search for products using `setSearchTerm`.
- Products are filtered based on the search term in a case-insensitive manner.

### Rendering:
- Displays a `Header` component with search functionality.
- Maps over the filtered `products` array to render `PortraitProductCard` components for each product.

### Functions:
- `addToCart` from `useCart` context is passed to each `PortraitProductCard`.

### Performance:
- Server-side rendering may impact performance negatively for high traffic pages due to processing required on each request.
- Filtering is client-side, which may affect performance with a very large list of products.

### Styling:
- Uses Tailwind CSS for styling and responsive grid layout for products.

### Accessibility:
- Ensure interactive elements are accessible, including providing accessible names for search inputs and buttons.

### SEO:
- Server-side rendering is beneficial for SEO for dynamic content but can slow down the response time.

### Important Notes:
- The page does not handle loading states or errors from fetch requests, which should be considered for production.
- The URLs for API requests are hardcoded to `localhost`, which should be updated to the production API when deployed.
- The `addToCart` functionality is mentioned but not implemented within this file; it should be correctly hooked up in the `PortraitProductCard` components.
- The search functionality does not debounce, which could lead to performance issues if the products array is large.
