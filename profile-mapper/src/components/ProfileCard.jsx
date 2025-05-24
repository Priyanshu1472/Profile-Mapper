import React, { useState } from "react";
import { MapPin, User, Map } from "lucide-react";
import ProfileDetails from "./ProfileDetails";

const ProfileCard = ({ profile, onShowSummary }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          border: "1px solid #e5e7eb",
          padding: "24px",
          transition: "all 0.2s",
          cursor: "pointer",
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#dbeafe",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {profile.profilePicture ? (
                <img
                  src={profile.profilePicture}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <User size={24} color="#2563eb" />
              )}
            </div>
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                }}
              >
                {profile.name}
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  margin: "2px 0 0 0",
                }}
              >
                ID: {profile.id}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "2px 0 0 0",
                }}
              >
                {profile.description}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShowSummary(profile);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "8px 12px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            <Map size={16} />
            <span>Summary</span>
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              color: "#6b7280",
            }}
          >
            <MapPin size={16} style={{ marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "14px" }}>{profile.address}</span>
          </div>

          {/* Preview of skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
              {profile.skills.slice(0, 3).map((skill, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "11px",
                    fontWeight: "500",
                  }}
                >
                  {skill}
                </span>
              ))}
              {profile.skills.length > 3 && (
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    padding: "2px 4px",
                  }}
                >
                  +{profile.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {showDetails && (
        <ProfileDetails profile={profile} onClose={handleCloseDetails} />
      )}
    </>
  );
};

export default ProfileCard;