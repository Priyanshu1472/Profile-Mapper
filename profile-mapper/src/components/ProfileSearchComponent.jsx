import React, { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SearchableProfileCard from './SearchableProfileCard';
import EmptySearchState from './EmptySearchState';

const ProfileSearchComponent = ({ profiles, onShowSummary, title = "Profile Search" }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dynamic filtering based on search term
  const filteredProfiles = useMemo(() => {
    if (!searchTerm.trim()) {
      return profiles;
    }

    const searchLower = searchTerm.toLowerCase();
    return profiles.filter(profile => 
      profile.name.toLowerCase().includes(searchLower) ||
      profile.description.toLowerCase().includes(searchLower)
    );
  }, [searchTerm, profiles]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h1>
        
        <div className="mb-6">
          <SearchBar 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            placeholder="Search by name or description..."
          />
        </div>

        <SearchResults 
          searchTerm={searchTerm}
          resultCount={filteredProfiles.length}
          totalCount={profiles.length}
        />
      </div>

      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.map((profile) => (
            <SearchableProfileCard
              key={profile.id}
              profile={profile}
              searchTerm={searchTerm}
              onShowSummary={onShowSummary}
            />
          ))}
        </div>
      ) : (
        <EmptySearchState searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default ProfileSearchComponent;