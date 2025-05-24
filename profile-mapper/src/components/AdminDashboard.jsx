import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Search, Filter, Eye, Edit3, Trash2, X, Check, 
  AlertTriangle, Loader, Save 
} from 'lucide-react'
import "../styles/AdminDashboard.css"; // Assuming you have a CSS file for styles
import { sampleProfiles } from '../data/profiles';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const [profiles, setProfiles] = useState(sampleProfiles); // Initial profiles data
  // Sample data - in a real app, this would come from an API
//   const [profiles, setProfiles] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john.doe@company.com",
//       phone: "+1 (555) 123-4567",
//       address: "123 Main St, New York, NY",
//       age: 32,
//       occupation: "Software Engineer",
//       department: "Engineering",
//       status: "Active",
//       joinDate: "2023-01-15",
//       experience: "5 years",
//       education: "BS Computer Science",
//       skills: ["JavaScript", "React", "Node.js"],
//       bio: "Experienced software engineer with a passion for building scalable web applications."
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane.smith@company.com",
//       phone: "+1 (555) 987-6543",
//       address: "456 Oak Ave, Los Angeles, CA",
//       age: 28,
//       occupation: "UX Designer",
//       department: "Design",
//       status: "Active",
//       joinDate: "2023-03-22",
//       experience: "3 years",
//       education: "BA Design",
//       skills: ["Figma", "Adobe XD", "Prototyping"],
//       bio: "Creative UX designer focused on user-centered design principles."
//     },
//     {
//       id: 3,
//       name: "Mike Johnson",
//       email: "mike.johnson@company.com",
//       phone: "+1 (555) 456-7890",
//       address: "789 Pine St, Chicago, IL",
//       age: 35,
//       occupation: "Product Manager",
//       department: "Product",
//       status: "Inactive",
//       joinDate: "2022-11-08",
//       experience: "7 years",
//       education: "MBA",
//       skills: ["Strategy", "Analytics", "Leadership"],
//       bio: "Strategic product manager with experience in B2B and B2C products."
//     }
//   ]);
    const navigate = useNavigate();
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDepartment, setFilterDepartment] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view', 'delete'
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    occupation: '',
    department: '',
    status: 'Active',
    experience: '',
    education: '',
    skills: '',
    bio: ''
  });

  const statuses = ['All', 'Active', 'Inactive'];
  const departments = ['All', 'Engineering', 'Design', 'Product', 'Marketing', 'Sales'];

  // Filter profiles based on search and filters
  useEffect(() => {
    let filtered = profiles;

    if (searchTerm) {
      filtered = filtered.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'All') {
      filtered = filtered.filter(profile => profile.status === filterStatus);
    }

    if (filterDepartment !== 'All') {
      filtered = filtered.filter(profile => profile.department === filterDepartment);
    }

    setFilteredProfiles(filtered);
  }, [profiles, searchTerm, filterStatus, filterDepartment]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#10B981';
      case 'Inactive':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const openModal = (mode, profile = null) => {
    setModalMode(mode);
    setSelectedProfile(profile);
    setError('');
    
    if (mode === 'add') {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        age: '',
        occupation: '',
        department: '',
        status: 'Active',
        experience: '',
        education: '',
        skills: '',
        bio: ''
      });
    } else if (mode === 'edit' && profile) {
      setFormData({
        name: profile.name,
        email: profile.email,
        phone: profile.phone || '',
        address: profile.address || '',
        age: profile.age || '',
        occupation: profile.occupation || '',
        department: profile.department || '',
        status: profile.status,
        experience: profile.experience || '',
        education: profile.education || '',
        skills: profile.skills ? profile.skills.join(', ') : '',
        bio: profile.bio || ''
      });
    }
    
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProfile(null);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      setError('Name and email are required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const profileData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        age: formData.age ? parseInt(formData.age) : null
      };

      if (modalMode === 'add') {
        const newProfile = {
          ...profileData,
          id: profiles.length + 1,
          joinDate: new Date().toISOString().split('T')[0]
        };
        setProfiles(prev => [...prev, newProfile]);
        setShowSuccessMessage('Profile added successfully!');
      } else if (modalMode === 'edit') {
        setProfiles(prev => prev.map(p => 
          p.id === selectedProfile.id ? { ...p, ...profileData } : p
        ));
        setShowSuccessMessage('Profile updated successfully!');
      }

      closeModal();
      
      // Clear success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfiles(prev => prev.filter(p => p.id !== selectedProfile.id));
      setShowSuccessMessage('Profile deleted successfully!');
      closeModal();
      
      // Clear success message after 3 seconds
      setTimeout(() => setShowSuccessMessage(''), 3000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProfile = (profileId) => {
    const profile = profiles.find(p => p.id === profileId);
    openModal('view', profile);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header">
        <div className="header-content">
          <div className="header-title-container">
            <Users className="text-blue-600" size={32} />
            <h1 className="header-title">Admin Dashboard</h1>
          </div>
          <p className="header-subtitle">Manage user profiles and data ({profiles.length} profiles)</p>
        </div>
        <div className="header-actions">

        <button onClick={() => navigate('/')} className="add-button">
            Go Back to Profiles
        </button>
        <button 
          onClick={() => openModal('add')} 
          className="add-button"
          disabled={loading}
          >
          <Plus size={20} />
          Add New Profile
        </button>
            </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="success-message">
          <Check size={20} />
          {showSuccessMessage}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-message">
          <AlertTriangle size={20} />
          {error}
          <button onClick={clearError} className="error-close-button">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="filters-container">
        <div className="filters-row">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              disabled={loading}
            />
          </div>

          <div className="filter-container">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
              disabled={loading}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status} Status</option>
              ))}
            </select>
          </div>

          <div className="filter-container">
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="filter-select"
              disabled={loading}
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'All' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="loading-container">
          <Loader className="loading-spinner" size={24} />
          <span className="loading-text">Loading...</span>
        </div>
      )}

      {/* Profiles Table */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="profiles-table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Status</th>
                <th>Join Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile, index) => (
                <tr
                  key={profile.id}
                  className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                >
                  <td className="table-cell">
                    <div className="user-info">
                      <div className="user-avatar">
                        {profile.avatar ? (
                          <img src={profile.avatar} alt={profile.name} />
                        ) : (
                          <span>{getInitials(profile.name)}</span>
                        )}
                      </div>
                      <div className="user-details">
                        <div className="name">{profile.name}</div>
                        <div className="occupation">{profile.occupation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell cell-text">{profile.email}</td>
                  <td className="table-cell cell-text">{profile.department}</td>
                  <td className="table-cell">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(profile.status) }}
                    >
                      {profile.status}
                    </span>
                  </td>
                  <td className="table-cell cell-text">{profile.joinDate}</td>
                  <td className="table-cell">
                    <div className="actions-container">
                      <button
                        onClick={() => handleViewProfile(profile.id)}
                        className="action-button view"
                        title="View Profile"
                        disabled={loading}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => openModal('edit', profile)}
                        className="action-button edit"
                        title="Edit Profile"
                        disabled={loading}
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => openModal('delete', profile)}
                        className="action-button delete"
                        title="Delete Profile"
                        disabled={loading}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProfiles.length === 0 && !loading && (
          <div className="empty-state">
            <Users size={48} className="empty-state-icon" />
            <h3>No profiles found</h3>
            <p>Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">
                {modalMode === 'add' && 'Add New Profile'}
                {modalMode === 'edit' && 'Edit Profile'}
                {modalMode === 'view' && 'Profile Details'}
                {modalMode === 'delete' && 'Delete Profile'}
              </h2>
              <button onClick={closeModal} className="modal-close" disabled={loading}>
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="modal-error">
                <AlertTriangle size={16} />
                {error}
              </div>
            )}

            {modalMode === 'delete' ? (
              <div className="delete-modal-content">
                <AlertTriangle size={48} className="delete-modal-icon" />
                <h3 className="delete-modal-title">Are you sure you want to delete this profile?</h3>
                <p className="delete-modal-text">This action cannot be undone. <strong>{selectedProfile?.name}</strong> will be permanently removed.</p>
                <div className="delete-modal-actions">
                  <button onClick={closeModal} className="cancel-button" disabled={loading}>
                    Cancel
                  </button>
                  <button onClick={handleDelete} className="delete-button" disabled={loading}>
                    {loading ? <Loader className="loading-spinner" size={16} /> : <Trash2 size={16} />}
                    Delete Profile
                  </button>
                </div>
              </div>
            ) : modalMode === 'view' ? (
              <div className="view-modal-content">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {selectedProfile?.avatar ? (
                      <img src={selectedProfile.avatar} alt={selectedProfile.name} />
                    ) : (
                      <span>{getInitials(selectedProfile?.name || '')}</span>
                    )}
                  </div>
                  <h3 className="profile-name">{selectedProfile?.name}</h3>
                  <p className="profile-occupation">{selectedProfile?.occupation}</p>
                </div>

                <div className="profile-details">
                  <div className="detail-field">
                    <label>Email</label>
                    <p>{selectedProfile?.email}</p>
                  </div>
                  <div className="detail-field">
                    <label>Phone</label>
                    <p>{selectedProfile?.phone || 'Not provided'}</p>
                  </div>
                  <div className="detail-field full-width">
                    <label>Address</label>
                    <p>{selectedProfile?.address || 'Not provided'}</p>
                  </div>
                  <div className="detail-field">
                    <label>Age</label>
                    <p>{selectedProfile?.age || 'N/A'}</p>
                  </div>
                  <div className="detail-field">
                    <label>Department</label>
                    <p>{selectedProfile?.department}</p>
                  </div>
                  <div className="detail-field">
                    <label>Status</label>
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(selectedProfile?.status) }}
                    >
                      {selectedProfile?.status}
                    </span>
                  </div>
                  <div className="detail-field">
                    <label>Join Date</label>
                    <p>{selectedProfile?.joinDate}</p>
                  </div>
                  <div className="detail-field full-width">
                    <label>Experience</label>
                    <p>{selectedProfile?.experience || 'Not provided'}</p>
                  </div>
                  <div className="detail-field full-width">
                    <label>Education</label>
                    <p>{selectedProfile?.education || 'Not provided'}</p>
                  </div>
                  <div className="detail-field full-width">
                    <label>Skills</label>
                    <div className="skills-container">
                      {selectedProfile?.skills?.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      )) || <p className="no-skills">No skills listed</p>}
                    </div>
                  </div>
                  <div className="detail-field full-width">
                    <label>Bio</label>
                    <p>{selectedProfile?.bio || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-modal-content">
                <div className="form-grid">
                  <div className="form-field">
                    <label>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field">
                    <label>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Experience</label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field full-width">
                    <label>Education</label>
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleInputChange}
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field full-width">
                    <label>Skills (comma-separated)</label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="e.g., JavaScript, React, Node.js"
                      className="form-input"
                      disabled={loading}
                    />
                  </div>
                  <div className="form-field full-width">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-textarea"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    onClick={closeModal} 
                    className="cancel-button"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="save-button"
                    disabled={loading}
                  >
                    {loading ? <Loader className="loading-spinner" size={16} /> : <Save size={16} />}
                    {modalMode === 'add' ? 'Add Profile' : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;  