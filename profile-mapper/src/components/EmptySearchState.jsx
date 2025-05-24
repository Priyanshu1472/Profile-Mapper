import React from 'react';
import { User } from 'lucide-react';

const EmptySearchState = ({ searchTerm }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
      <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No profiles found</h3>
      <p className="text-gray-500">
        {searchTerm ? (
          <>No profiles match "<span className="font-medium">{searchTerm}</span>". Try adjusting your search term.</>
        ) : (
          "Try adjusting your search term to find matching profiles."
        )}
      </p>
    </div>
  );
};

export default EmptySearchState;