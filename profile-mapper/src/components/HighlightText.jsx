import React from 'react';

const HighlightText = ({ text, searchTerm }) => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200 font-semibold rounded px-1">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default HighlightText;