import React, { useState, useEffect } from "react";
import { User, AlertCircle } from "lucide-react";
import { geocodeAddress } from "../services/geocoding";
import ProfileDetails from "./ProfileDetails";

const MapViewer = ({ profile, onClose }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [geocodedAddress, setGeocodedAddress] = useState("");
  const [showProfileDetails, setShowProfileDetails] = useState(false);

  useEffect(() => {
    // Load Leaflet CSS and JS
    if (!window.L) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setMapLoaded(true);
    }

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

  // Fetch coordinates when component mounts
  useEffect(() => {
    const fetchCoordinates = async () => {
      setLoading(true);
      setError(null);

      const result = await geocodeAddress(profile.address);

      if (result) {
        setCoordinates([result.lat, result.lng]);
        setGeocodedAddress(result.display_name);
      } else {
        setError("Unable to find location for the provided address");
      }

      setLoading(false);
    };

    fetchCoordinates();
  }, [profile.address]);

  useEffect(() => {
    if (mapLoaded && coordinates && !mapInstance) {
      const map = window.L.map("map-container").setView(coordinates, 13);

      window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      // Custom marker icon
      const customIcon = window.L.divIcon({
        html: `<div style="background: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                 <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
               </div>`,
        className: "custom-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      window.L.marker(coordinates, { icon: customIcon })
        .addTo(map)
        .bindPopup(
          `<strong>Location</strong><br>${geocodedAddress || profile.address}`
        )
        .openPopup();

      setMapInstance(map);
    }
  }, [mapLoaded, coordinates, profile.address, geocodedAddress, mapInstance]);

  const handleProfileClick = () => {
    setShowProfileDetails(true);
  };

  const handleCloseProfileDetails = () => {
    setShowProfileDetails(false);
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking on the backdrop itself, not on the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                animation: "spin 1s linear infinite",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                border: "3px solid #e5e7eb",
                borderTopColor: "#2563eb",
                margin: "0 auto 8px",
              }}
            ></div>
            <p style={{ color: "#6b7280" }}>Finding location...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            backgroundColor: "#fef2f2",
            borderRadius: "8px",
            border: "1px solid #fecaca",
          }}
        >
          <div style={{ textAlign: "center", color: "#dc2626" }}>
            <AlertCircle size={48} style={{ margin: "0 auto 16px" }} />
            <p style={{ margin: 0, fontWeight: "600" }}>Location Not Found</p>
            <p
              style={{
                margin: "8px 0 0 0",
                fontSize: "14px",
                color: "#7f1d1d",
              }}
            >
              {error}
            </p>
          </div>
        </div>
      );
    }

    if (!mapLoaded) {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                animation: "spin 1s linear infinite",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                border: "3px solid #e5e7eb",
                borderTopColor: "#2563eb",
                margin: "0 auto 8px",
              }}
            ></div>
            <p style={{ color: "#6b7280" }}>Loading map...</p>
          </div>
        </div>
      );
    }

    return (
      <div
        id="map-container"
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      ></div>
    );
  };

  if (showProfileDetails) {
    return <ProfileDetails profile={profile} onClose={handleCloseProfileDetails} />;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
      onClick={handleBackdropClick}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          maxWidth: "64rem",
          width: "100%",
          maxHeight: "90vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#f9fafb",
          }}
        >
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "8px",
              transition: "background-color 0.2s",
              flex: 1
            }}
            onClick={handleProfileClick}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#dbeafe",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={20} color="#2563eb" />
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
                  color: "#6b7280",
                  margin: "4px 0 0 0",
                }}
              >
                {geocodedAddress || profile.address}
              </p>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px" }}>{renderContent()}</div>
        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #e5e7eb",
            backgroundColor: "#f9fafb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              backgroundColor: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#4b5563")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b7280")}
          >
            Close
          </button>
          <button
            onClick={handleProfileClick}
            style={{
              padding: "8px 16px",
              backgroundColor: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#2563eb")}
          >
            View Full Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapViewer;