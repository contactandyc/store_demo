Page Component: `index.tsx` (Homepage or Merchants List Page)

### What it is:
A Next.js page that lists merchants, each with a card showing their top products.

### Data Fetching:
- Uses `getStaticProps` to fetch merchants and their top products at build time.
- The page is revalidated every 300 seconds (5 minutes), so the data may be refreshed without redeploying.

### Props:
- Receives a `merchants` prop which is an array of merchants, each with a name, id, and products.

### Rendering:
- Maps over the `merchants` array and renders a `MerchantCard` for each merchant.

### User Interaction:
- Users can view a list of merchants and their top products.
- Clicking on a `MerchantCard` will likely navigate to a page with details for that merchant (handled by the `MerchantCard`'s internal `<Link>`).

### Performance:
- By using `getStaticProps` with revalidation, the page benefits from static generation with periodic updates, which is generally efficient.

### Styling:
- The container uses `mx-auto` and `p-4` classes for responsive centering and padding.

### Accessibility:
- Ensure that each `MerchantCard` component is accessible, e.g., proper keyboard navigation and aria labels.

### SEO:
- Static generation is beneficial for SEO, as the content is present at request time.

### Important Notes:
- The actual data fetching implementation (API endpoint) is not shown and should be set up according to your backend.
- Error handling for the data fetching should be implemented to manage when the fetch request fails.
