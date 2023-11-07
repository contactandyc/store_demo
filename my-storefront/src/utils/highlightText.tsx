import React from 'react';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const highlightText = (text: string, searchTerm: string): JSX.Element => {
  // Trim the searchTerm and check if it is empty
  const trimmedSearchTerm = searchTerm.trim();
  if (!trimmedSearchTerm) {
    // If search term is empty or spaces, return the text without highlighting
    return <>{text}</>;
  }

  const escapedSearchTerm = escapeRegExp(trimmedSearchTerm);
  const regex = new RegExp(`(${escapedSearchTerm.split(' ').join('|')})`, 'gi');
  // const regex = new RegExp(`(${searchTerm.split(' ').join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.filter(String).map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="highlightText">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};
