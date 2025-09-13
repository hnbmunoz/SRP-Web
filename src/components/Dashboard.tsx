import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.scss';
import { getMedicalIcon } from './custom-templates/MedicalIconMapper';

interface DashboardCardProps {
  title: string;
  description: string;
  items: string[];
  path: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, items, path }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(path);
  };

  const handleItemClick = (item: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const itemPath = item.toLowerCase().replace(/\s+/g, '-');
    navigate(`${path}/${itemPath}`);
  };

  return (
    <div className={styles.dashboardCard} onClick={handleCardClick}>
      <div className={styles.cardHeader}>
        {getMedicalIcon(title, undefined, styles.cardIcon)}
        <div>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.cardContent}>
        <h4 className={styles.quickAccessTitle}>Quick Access:</h4>
        <ul className={styles.quickAccessList}>
          {items.slice(0, 4).map((item, index) => (
            <li key={index} className={styles.quickAccessItem}>
              <button
                className={styles.quickAccessButton}
                onClick={(e) => handleItemClick(item, e)}
                aria-label={`Navigate to ${item}`}
              >
                {getMedicalIcon(title, item, styles.itemIcon)}
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
        {items.length > 4 && (
          <p className={styles.moreItems}>+{items.length - 4} more items</p>
        )}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {

  // Medical dashboard modules
  const dashboardModules = [
    {
      title: 'Patient Management',
      description: 'Manage patient records, admissions, and medical history',
      path: '/patient-management',
      items: [
        'Patient Records',
        'Admission Forms',
        'Discharge Summary',
        'Medical History',
        'Insurance Details'
      ]
    },
    {
      title: 'Clinical Operations',
      description: 'Handle appointments, treatments, and prescriptions',
      path: '/clinical-operations',
      items: [
        'Appointment Scheduling',
        'Treatment Plans',
        'Prescription Management',
        'Lab Results',
        'Vital Signs Monitor'
      ]
    },
    {
      title: 'Emergency Services',
      description: 'Manage emergency cases and critical care',
      path: '/emergency-services',
      items: [
        'Emergency Admissions',
        'Trauma Cases',
        'ICU Management',
        'Ambulance Dispatch',
        'Critical Care'
      ]
    },
    {
      title: 'Laboratory & Diagnostics',
      description: 'Handle lab tests, imaging, and diagnostic reports',
      path: '/laboratory-diagnostics',
      items: [
        'Lab Test Orders',
        'Imaging Requests',
        'Pathology Reports',
        'Blood Bank',
        'Radiology Results'
      ]
    }
  ];

  // Quick stats data
  const quickStats = [
    { label: 'Active Patients', value: '1,247', trend: '+12%' },
    { label: 'Today\'s Appointments', value: '89', trend: '+5%' },
    { label: 'Emergency Cases', value: '7', trend: '-2%' },
    { label: 'Lab Results Pending', value: '23', trend: '+8%' }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Medical Dashboard</h1>
        <p className={styles.dashboardSubtitle}>
          Welcome to your comprehensive medical management system
        </p>
      </div>

      {/* Quick Stats Section */}
      <div className={styles.quickStats}>
        <h2 className={styles.sectionTitle}>Quick Overview</h2>
        <div className={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={`${styles.statTrend} ${stat.trend.startsWith('+') ? styles.positive : styles.negative}`}>
                {stat.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Modules Section */}
      <div className={styles.mainModules}>
        <h2 className={styles.sectionTitle}>Core Modules</h2>
        <div className={styles.modulesGrid}>
          {dashboardModules.slice(0, 2).map((module, index) => (
            <DashboardCard
              key={index}
              title={module.title}
              description={module.description}
              items={module.items}
              path={module.path}
            />
          ))}
        </div>
      </div>

      {/* Specialized Care Section */}
      <div className={styles.specializedCare}>
        <h2 className={styles.sectionTitle}>Specialized Care</h2>
        <div className={styles.modulesGrid}>
          {dashboardModules.slice(2, 4).map((module, index) => (
            <DashboardCard
              key={index}
              title={module.title}
              description={module.description}
              items={module.items}
              path={module.path}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className={styles.recentActivity}>
        <h2 className={styles.sectionTitle}>Recent Activity</h2>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>👤</div>
            <div className={styles.activityContent}>
              <p className={styles.activityText}>New patient admission: John Doe</p>
              <span className={styles.activityTime}>2 minutes ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>🧪</div>
            <div className={styles.activityContent}>
              <p className={styles.activityText}>Lab results ready for Patient ID: 12345</p>
              <span className={styles.activityTime}>15 minutes ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>🚨</div>
            <div className={styles.activityContent}>
              <p className={styles.activityText}>Emergency case resolved in ICU</p>
              <span className={styles.activityTime}>1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;