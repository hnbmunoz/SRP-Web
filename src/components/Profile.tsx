import React, { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ProfileSection from './custom-component/ProfileSection/ProfileSection';
import FormField from './custom-component/FormField/FormField';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCamera,
  FaStethoscope,
  FaCalendarAlt,
  FaIdCard,
  FaLock
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


const Profile: React.FC = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    firstName: 'Dr. John',
    lastName: 'Smith',
    email: 'john.smith@medportal.com',
    phone: '+1 (555) 123-4567',
    address: '123 Medical Center Drive',
    city: 'Healthcare City',
    state: 'CA',
    zipCode: '90210',
    specialization: 'Cardiology',
    licenseNumber: 'MD123456789',
    dateOfBirth: '1980-05-15',
    joinDate: '2020-01-15'
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleEdit = (section: string) => {
    setEditingSection(section);
    setEditedProfile(profile);
  };

  const handleSave = (section: string) => {
    setProfile(editedProfile);
    setEditingSection(null);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setEditingSection(null);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
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
              <FaUser />
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
              value={editingSection === 'personal' ? editedProfile.firstName : profile.firstName}
              placeholder="Enter first name"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('firstName', value)}
              required
            />
            <FormField
              label="Last Name"
              value={editingSection === 'personal' ? editedProfile.lastName : profile.lastName}
              placeholder="Enter last name"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('lastName', value)}
              required
            />
            <FormField
              label="Date of Birth"
              value={editingSection === 'personal' ? editedProfile.dateOfBirth : formatDate(profile.dateOfBirth)}
              type="date"
              isEditing={editingSection === 'personal'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('dateOfBirth', value)}
            />
            <FormField
              label="Specialization"
              value={editingSection === 'personal' ? editedProfile.specialization : profile.specialization}
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
              value={editingSection === 'contact' ? editedProfile.email : profile.email}
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
              value={editingSection === 'contact' ? editedProfile.phone : profile.phone}
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
              value={editingSection === 'address' ? editedProfile.address : profile.address}
              placeholder="Enter street address"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('address', value)}
            />
            <FormField
              label="City"
              value={editingSection === 'address' ? editedProfile.city : profile.city}
              placeholder="Enter city"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('city', value)}
            />
            <FormField
              label="State"
              value={editingSection === 'address' ? editedProfile.state : profile.state}
              placeholder="Enter state"
              isEditing={editingSection === 'address'}
              isLoading={isLoading}
              onChange={(value) => handleInputChange('state', value)}
            />
            <FormField
              label="ZIP Code"
              value={editingSection === 'address' ? editedProfile.zipCode : profile.zipCode}
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
              value={editingSection === 'professional' ? editedProfile.licenseNumber : profile.licenseNumber}
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
      </div>
    </div>
  );
};

export default Profile;