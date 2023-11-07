import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CookieConsent: React.FC = () => {
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

export default CookieConsent;