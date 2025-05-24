import React from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  User,
} from "lucide-react";

const ProfileDetails = ({ profile, onClose }) => {
  if (!profile) return null; // Safety check

  return (
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
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          maxWidth: "600px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            backgroundColor: "#f3f4f6",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e5e7eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f3f4f6")
          }
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div
          style={{
            padding: "32px 32px 24px 32px",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
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
                <User size={40} color="#2563eb" />
              )}
            </div>
            <div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                }}
              >
                {profile.name}
              </h2>
              <p
                style={{
                  fontSize: "16px",
                  color: "#6b7280",
                  margin: "4px 0 0 0",
                }}
              >
                {profile.description}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: "#9ca3af",
                  margin: "2px 0 0 0",
                }}
              >
                ID: {profile.id}
              </p>
            </div>
          </div>

          {profile.bio && (
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                margin: 0,
                lineHeight: "1.5",
              }}
            >
              {profile.bio}
            </p>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: "24px 32px 32px 32px" }}>
          <div style={{ display: "grid", gap: "24px" }}>
            {/* Contact Info */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "12px",
                }}
              >
                Contact Information
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {profile.email && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <Mail size={16} />
                    <span style={{ fontSize: "14px" }}>{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <Phone size={16} />
                    <span style={{ fontSize: "14px" }}>{profile.phone}</span>
                  </div>
                )}
                {profile.address && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <MapPin
                      size={16}
                      style={{ marginTop: "2px", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "14px" }}>{profile.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "12px",
                }}
              >
                Professional Details
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {profile.experience && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <Briefcase size={16} />
                    <span style={{ fontSize: "14px" }}>
                      Experience: {profile.experience}
                    </span>
                  </div>
                )}
                {profile.education && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#6b7280",
                    }}
                  >
                    <GraduationCap size={16} />
                    <span style={{ fontSize: "14px" }}>
                      {profile.education}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px",
                  }}
                >
                  Skills
                </h3>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                >
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: "#dbeafe",
                        color: "#1e40af",
                        padding: "4px 12px",
                        borderRadius: "16px",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
