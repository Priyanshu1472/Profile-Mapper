import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ProfileCard from "./components/ProfileCard";
import MapViewer from "./components/MapViewer";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import EmptySearchState from "./components/EmptySearchState";
import { sampleProfiles } from "./data/profiles";
import AdminDashboard from "./components/AdminDashboard"; 

function MainApp() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate(); // <-- get navigate function

  // ... all your existing useEffects and logic here ...

  const handleShowSummary = (profile) => {
    if (!profile.address) {
      alert("Address not available for this profile.");
      return;
    }
    setSelectedProfile(profile);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setSelectedProfile(null);
  };

  // Filtered profiles logic
  const filteredProfiles = useMemo(() => {
    if (!searchTerm.trim()) return sampleProfiles;
    const searchLower = searchTerm.toLowerCase();
    return sampleProfiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchLower) ||
        profile.description.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f9fafb",
          padding: "32px 0",
        }}
      >
        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 16px" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                color: "#111827",
                marginBottom: "16px",
              }}
            >
              Profile Search & Mapper
            </h1>

            {/* Add Admin Panel button here */}
            <button
              onClick={() => navigate("/admin")}
              style={{
                marginBottom: "20px",
                padding: "10px 20px",
                fontWeight: "bold",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Go to Admin Panel
            </button>

            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Search by name or description..."
            />

            {searchTerm && (
              <div style={{ marginTop: "8px" }}>
                <button
                  onClick={() => setSearchTerm("")}
                  style={{
                    backgroundColor: "#e5e7eb",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}

            <SearchResults
              searchTerm={searchTerm}
              resultCount={filteredProfiles.length}
              totalCount={sampleProfiles.length}
            />
          </div>

          {filteredProfiles.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: "24px",
              }}
            >
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onShowSummary={handleShowSummary}
                />
              ))}
            </div>
          ) : (
            <EmptySearchState searchTerm={searchTerm} />
          )}
        </div>
      </div>

      {showMap && selectedProfile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeIn 0.3s ease-in-out",
            zIndex: 1000,
          }}
        >
          <MapViewer profile={selectedProfile} onClose={handleCloseMap} />
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
