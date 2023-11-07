Creating a consent pop-up for cookies can be done by setting up a state in your React component that checks if the user has already given consent. If not, the pop-up will be shown. Once consent is given, you set a cookie to remember the choice. Below is a simplified example:

Firstly, install the `js-cookie` library if you haven't already:

```bash
npm install js-cookie
```

Then, create a React component that will manage the cookie consent:

```tsx
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if the consent cookie exists
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleConsent = (): void => {
    // Set the consent cookie and hide the popup
    Cookies.set('cookie-consent', 'true', { expires: 365 }); // expires in 1 year
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent-popup">
      {/* Your custom styling and layout for the popup */}
      <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
      <button onClick={handleConsent}>I Agree</button>
    </div>
  );
};

export default CookieConsentPopup;
```

Now, include this component in your app, typically at the top level of your application, such as in `_app.tsx` for a Next.js app:

```tsx
import React from 'react';
import { AppProps } from 'next/app';
import CookieConsentPopup from '../components/CookieConsentPopup'; // Update with the actual path to your component

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <CookieConsentPopup />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
```

This will show the consent popup on every page until the user consents. Once they consent, the popup will not show again for the duration of the cookie's life. Always ensure to provide a clear and accessible way for users to withdraw consent if they wish to do so, which may require additional functionality.
