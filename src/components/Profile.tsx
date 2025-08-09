import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ProfileSection from './custom-component/ProfileSection/ProfileSection';
import FormField from './custom-component/FormField/FormField';
import { useAuth } from '../store/authStore';
import { useTheme } from '../store/themeStore';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaStethoscope,
  FaCalendarAlt,
  FaIdCard,
  FaLock,
  FaPalette,
  FaMoon,
  FaSun
} from 'react-icons/fa';

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  specialization: string;
  licenseNumber: string;
  dateOfBirth: string;
  joinDate: string;
  avatar?: string;
}

// Helper function to convert auth user to profile format
const convertAuthUserToProfile = (authUser: any): UserProfile => {
  const nameParts = authUser.name.split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  // Generate profile data based on user role
  const roleBasedData = {
    admin: {
      specialization: 'Healthcare Administration',
      licenseNumber: 'ADM123456789',
      phone: '+1 (555) 100-0001',
      address: '100 Admin Plaza',
      city: 'Medical Center',
      state: 'CA',
      zipCode: '90001'
    },
    user: {
      specialization: 'General Practice',
      licenseNumber: 'GP987654321',
      phone: '+1 (555) 200-0002',
      address: '200 Practice Lane',
      city: 'Healthcare City',
      state: 'NY',
      zipCode: '10001'
    },
    moderator: {
      specialization: 'Medical Supervision',
      licenseNumber: 'MOD456789123',
      phone: '+1 (555) 300-0003',
      address: '300 Supervisor Street',
      city: 'Oversight Town',
      state: 'TX',
      zipCode: '75001'
    }
  };

  const roleData = roleBasedData[authUser.role as keyof typeof roleBasedData] || roleBasedData.user;

  return {
    id: authUser.id,
    firstName,
    lastName,
    email: authUser.email,
    joinDate: authUser.createdAt,
    avatar: authUser.avatar,
    dateOfBirth: '1985-03-15', // Default date
    ...roleData
  };
};

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);

  // Initialize profile from auth user
  useEffect(() => {
    if (user) {
      const userProfile = convertAuthUserToProfile(user);
      setProfile(userProfile);
      setEditedProfile(userProfile);
    }
  }, [user]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!profile || !user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.loadingState}>
          <FaUser className={styles.loadingIcon} />
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setEditedProfile(profile);
  };

  const handleSave = (section: string) => {
    if (editedProfile) {
      setProfile(editedProfile);
      
      // Update the auth store with the new name if it changed
      if (section === 'personal') {
        const newName = `${editedProfile.firstName} ${editedProfile.lastName}`.trim();
        if (newName !== user.name) {
          updateUser({ name: newName });
        }
      }
      
      // Update email in auth store if it changed
      if (section === 'contact' && editedProfile.email !== user.email) {
        updateUser({ email: editedProfile.email });
      }
      
      setEditingSection(null);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setEditedProfile(profile);
      setEditingSection(null);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    if (editedProfile) {
      setEditedProfile(prev => prev ? ({
        ...prev,
        [field]: value
      }) : null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatar}>
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className={styles.avatarImage}
                />
              ) : (
                <FaUser />
              )}
            </div>
            <button className={styles.avatarEditButton}>
              <FaCamera />
            </button>
          </div>
          <div className={styles.userBasicInfo}>
            <h1 className={styles.userName}>
              {profile.firstName} {profile.lastName}
            </h1>
            <p className={styles.userSpecialization}>
              <FaStethoscope />
              {profile.specialization}
            </p>
            <p className={styles.userJoinDate}>
              <FaCalendarAlt />
              Member since {formatDate(profile.joinDate)}
            </p>
          </div>
        </div>
      </div>

      <div className={styles.profileContent}>
        {/* Personal Information Section */}
        <ProfileSection
          title="Personal Information"
          icon={<FaUser />}
          isEditing={editingSection === 'personal'}
          onEdit={() => handleEdit('personal')}
          onSave={() => handleSave('personal')}
          onCancel={handleCancel}
        >
          <div className={styles.formGrid}>
            <FormField
              label="First Name"
              value={editingSection === 'personal' ? (editedProfile?.firstName || '') : profile.firstName}
              placeholder="Enter first name"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('firstName', value)}
              required
            />
            <FormField
              label="Last Name"
              value={editingSection === 'personal' ? (editedProfile?.lastName || '') : profile.lastName}
              placeholder="Enter last name"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('lastName', value)}
              required
            />
            <FormField
              label="Date of Birth"
              value={editingSection === 'personal' ? (editedProfile?.dateOfBirth || '') : formatDate(profile.dateOfBirth)}
              type="date"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
            />
            <FormField
              label="Specialization"
              value={editingSection === 'personal' ? (editedProfile?.specialization || '') : profile.specialization}
              placeholder="Enter medical specialization"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('specialization', value)}
            />
          </div>
        </ProfileSection>

        {/* Contact Information Section */}
        <ProfileSection
          title="Contact Information"
          icon={<FaEnvelope />}
          isEditing={editingSection === 'contact'}
          onEdit={() => handleEdit('contact')}
          onSave={() => handleSave('contact')}
          onCancel={handleCancel}
        >
          <div className={styles.formGrid}>
            <FormField
              label="Email Address"
              value={editingSection === 'contact' ? (editedProfile?.email || '') : profile.email}
              type="email"
              placeholder="Enter email address"
              icon={<FaEnvelope />}
              isEditing={editingSection === 'contact'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('email', value)}
              required
            />
            <FormField
              label="Phone Number"
              value={editingSection === 'contact' ? (editedProfile?.phone || '') : profile.phone}
              type="tel"
              placeholder="Enter phone number"
              icon={<FaPhone />}
              isEditing={editingSection === 'contact'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('phone', value)}
            />
          </div>
        </ProfileSection>

        {/* Address Information Section */}
        <ProfileSection
          title="Address Information"
          icon={<FaMapMarkerAlt />}
          isEditing={editingSection === 'address'}
          onEdit={() => handleEdit('address')}
          onSave={() => handleSave('address')}
          onCancel={handleCancel}
        >
          <div className={styles.formGrid}>
            <FormField
              label="Street Address"
              value={editingSection === 'address' ? (editedProfile?.address || '') : profile.address}
              placeholder="Enter street address"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('address', value)}
            />
            <FormField
              label="City"
              value={editingSection === 'address' ? (editedProfile?.city || '') : profile.city}
              placeholder="Enter city"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('city', value)}
            />
            <FormField
              label="State"
              value={editingSection === 'address' ? (editedProfile?.state || '') : profile.state}
              placeholder="Enter state"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('state', value)}
            />
            <FormField
              label="ZIP Code"
              value={editingSection === 'address' ? (editedProfile?.zipCode || '') : profile.zipCode}
              placeholder="Enter ZIP code"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('zipCode', value)}
            />
          </div>
        </ProfileSection>

        {/* Professional Information Section */}
        <ProfileSection
          title="Professional Information"
          icon={<FaIdCard />}
          isEditing={editingSection === 'professional'}
          onEdit={() => handleEdit('professional')}
          onSave={() => handleSave('professional')}
          onCancel={handleCancel}
        >
          <div className={styles.formGrid}>
            <FormField
              label="License Number"
              value={editingSection === 'professional' ? (editedProfile?.licenseNumber || '') : profile.licenseNumber}
              placeholder="Enter medical license number"
              isEditing={editingSection === 'professional'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('licenseNumber', value)}
              required
            />
            <FormField
              label="Join Date"
              value={formatDate(profile.joinDate)}
              isEditing={false}
              isLoading={isLoading}
              disabled
            />
          </div>
        </ProfileSection>

        {/* Security Settings Section */}
        <ProfileSection
          title="Security Settings"
          icon={<FaLock />}
          hideActions={true}
        >
          <div className={styles.securityActions}>
            <button className={styles.securityButton}>
              <FaLock />
              Change Password
            </button>
            <button className={styles.securityButton}>
              <FaLock />
              Two-Factor Authentication
            </button>
          </div>
        </ProfileSection>

        {/* Appearance Settings Section */}
        <ProfileSection
          title="Appearance Settings"
          icon={<FaPalette />}
          hideActions={true}
        >
          <div className={styles.appearanceSettings}>
            <div className={styles.themeToggle}>
              <div className={styles.themeInfo}>
                <div className={styles.themeIcon}>
                  {isDarkMode ? <FaMoon /> : <FaSun />}
                </div>
                <div className={styles.themeDetails}>
                  <h4 className={styles.themeTitle}>
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </h4>
                  <p className={styles.themeDescription}>
                    {isDarkMode
                      ? 'Switch to light mode for a brighter interface'
                      : 'Switch to dark mode for a comfortable viewing experience'
                    }
                  </p>
                </div>
              </div>
              <button
                className={`${styles.toggleButton} ${isDarkMode ? styles.dark : styles.light}`}
                onClick={toggleTheme}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                <div className={styles.toggleSlider}>
                  <div className={styles.toggleIcon}>
                    {isDarkMode ? <FaMoon /> : <FaSun />}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </ProfileSection>
      </div>
    </div>
  );
};

export default Profile;