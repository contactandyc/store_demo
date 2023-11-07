Page Component: `_app.tsx` (Next.js Global App Component)

### What it is:
A custom App component that initializes pages. It wraps all pages in the Next.js application, providing global styles and context providers.

### How to use it:
This file is used by Next.js automatically and does not require manual usage. It acts as the root component that is common across all pages.

### Global Setup:
- It wraps the entire application with the `CartProvider` from the `CartContext` to manage and provide cart state throughout the app.
- The `CookieConsent` component is included at the top level, which will conditionally render consent UI based on cookies.

### Styling:
- Global styles are imported from `globals.css`, which affects all pages in the application.

### Accessibility:
- Consider verifying that `CookieConsent` meets accessibility standards (like proper ARIA roles, labels, etc.).

### User Interaction:
- Users will interact with the `CookieConsent` UI when it's visible.

### Performance:
- Wrapping components with context providers at the top level can ensure that state management logic does not cause unnecessary re-renders.

### Server-Side:
- The `MyApp` component can also be used to inject page-level props using `getInitialProps` or `getServerSideProps`, although it's not shown in the provided code snippet.

### Rendering:
- Renders the `Component` passed into `MyApp` with the given `pageProps`, which are specific props for each page.

### Important Notes:
- `_app.tsx` is the core file for Next.js applications where global providers and configurations should be set.
- Any additional global components (like a navbar or footer) should be included here.
