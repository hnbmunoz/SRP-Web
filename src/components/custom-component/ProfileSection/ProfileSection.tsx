import React from 'react';
import styles from './ProfileSection.module.scss';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { useThemeClass } from '../../../store/themeStore';

export interface ProfileSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isEditing?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  className?: string;
  hideActions?: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  children,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
  className = '',
  hideActions = false
}) => {
  const { themeClass } = useThemeClass();
  return (
    <div className={`${styles.profileSection} ${styles[themeClass]} ${className}`}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          {icon}
          <h3>{title}</h3>
        </div>
        {!hideActions && (
          <div className={styles.sectionActions}>
            {isEditing ? (
              <>
                <button className={styles.saveButton} onClick={onSave}>
                  <FaSave />
                  Save
                </button>
                <button className={styles.cancelButton} onClick={onCancel}>
                  <FaTimes />
                  Cancel
                </button>
              </>
            ) : (
              <button className={styles.editButton} onClick={onEdit}>
                <FaEdit />
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;