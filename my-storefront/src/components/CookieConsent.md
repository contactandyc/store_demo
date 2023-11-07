Component: `CookieConsent`

### What it is:
`CookieConsent` is a React functional component that displays a cookie consent popup if the user hasn't already agreed to the use of cookies.

### How to use it:

1. **Import the component** where you want the cookie consent popup to appear:
   ```tsx
   import CookieConsent from './components/CookieConsent';
   ```

2. **Place the `<CookieConsent>` component** in your component tree, typically at the top level of your application:
   ```tsx
   <CookieConsent />
   ```

### Props:
The component does not accept any props.

### Internal Logic:

- Uses a React state hook to track the visibility of the consent popup.
- On component mount, an effect hook checks for the existence of a 'cookie-consent' cookie.
- If the cookie does not exist, the popup is made visible.
- The `handleConsent` function sets the 'cookie-consent' cookie and hides the popup.

### Styling:

- You should define `.cookie-consent-popup` in your CSS with the desired styling for the popup.
- The sample code does not include any specific styling.

### Accessibility:

- Ensure that the consent popup is navigable via keyboard and screen readers are able to announce it properly.
- The button should have accessible text indicating the action it performs.

### User Interaction:

- The user can give their consent by clicking the 'I Agree' button.
- Upon clicking, the consent cookie is set, and the popup is hidden.

### Rendering:

- If the 'cookie-consent' cookie is not set, it renders a div with a message and a button for the user to agree.
- If the cookie is set, or after the user clicks 'I Agree', the component renders nothing (`return null`).
