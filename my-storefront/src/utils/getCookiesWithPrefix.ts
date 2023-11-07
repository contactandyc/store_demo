export function getCookiesWithPrefix(prefix: string): { [cookieName: string]: string } {
  const cookies = document.cookie.split(';');
  const matchingCookies: { [cookieName: string]: string } = {};

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(prefix)) {
      const [name, value] = cookie.split('=');
      matchingCookies[name] = decodeURIComponent(value);
    }
  }

  return matchingCookies;
}
