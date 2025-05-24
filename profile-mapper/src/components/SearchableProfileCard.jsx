import React from 'react';
import { MapPin, Briefcase } from 'lucide-react';
import HighlightText from './HighlightText';

const SearchableProfileCard = ({ profile, searchTerm, onShowSummary }) => {
  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=3b82f6&color=ffffff&size=64`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md  transition-all duration-300 p-6 border border-gray-100 ">
      <div className="flex items-center mb-4">
        <img
          src={profile.profilePicture}
          alt={profile.name}
          className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-gray-200"
          onError={handleImageError}
        />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            <HighlightText text={profile.name} searchTerm={searchTerm} />
          </h3>
          <div className="flex items-center text-blue-600 mb-2">
            <Briefcase className="w-4 h-4 mr-2" />
            <span className="text-sm">
              <HighlightText text={profile.description} searchTerm={searchTerm} />
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-start text-gray-600 mb-4">
        <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
        <span className="text-sm">{profile.address}</span>
      </div>

      {onShowSummary && (
        <button
          onClick={() => onShowSummary(profile)}
          className="w-full bg-blue-500  text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
        >
          View on Map
        </button>
      )}
    </div>
  );
};

export default SearchableProfileCard;
