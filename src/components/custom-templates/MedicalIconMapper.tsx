import {
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaStethoscope,
  FaHospital,
  FaHospitalAlt,
  FaAmbulance,
  FaUserInjured,
  FaFileMedical,
  FaVials,
  FaSyringe,
  FaXRay,
  FaPills,
  FaThermometerHalf,
  FaWeight,
  FaEye,
  FaTooth,
  FaBrain,
  FaLungs,
  FaHandHoldingMedical,
  FaFirstAid,
  FaUserNurse,
  FaMicroscope,
  FaBookMedical,
  FaTruck,
  FaMedkit,
  FaShieldAlt
} from 'react-icons/fa';

// Medical icon mapping function with enhanced coverage
export const getMedicalIcon = (title: string, itemName?: string, className?: string, size?: 'small' | 'medium' | 'large') => {
  const titleLower = title.toLowerCase();
  const itemLower = itemName?.toLowerCase() || '';
  
  // Size classes
  const sizeClass = size ? `icon-${size}` : '';
  const combinedClassName = `${className || ''} ${sizeClass}`.trim();

  // Main module icons
  if (titleLower.includes('patient') || titleLower.includes('module 1')) {
    return <FaUserInjured className={combinedClassName} aria-label="Patient Management" />;
  }
  if (titleLower.includes('appointment') || titleLower.includes('module 2') || titleLower.includes('clinical')) {
    return <FaCalendarAlt className={combinedClassName} aria-label="Clinical Operations" />;
  }
  if (titleLower.includes('doctor') || titleLower.includes('physician')) {
    return <FaUserMd className={combinedClassName} aria-label="Doctor" />;
  }
  if (titleLower.includes('nurse') || titleLower.includes('nursing')) {
    return <FaUserNurse className={combinedClassName} aria-label="Nurse" />;
  }
  if (titleLower.includes('prescription') || titleLower.includes('medication')) {
    return <FaPrescriptionBottleAlt className={combinedClassName} aria-label="Prescription" />;
  }
  if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
    return <FaAmbulance className={combinedClassName} aria-label="Emergency Services" />;
  }
  if (titleLower.includes('lab') || titleLower.includes('test') || titleLower.includes('diagnostic')) {
    return <FaVials className={combinedClassName} aria-label="Laboratory & Diagnostics" />;
  }

  // Enhanced sub-item icons
  if (itemLower.includes('record') || itemLower.includes('file') || itemLower.includes('history')) {
    return <FaFileMedical className={combinedClassName} aria-label="Medical Records" />;
  }
  if (itemLower.includes('vital') || itemLower.includes('monitor') || itemLower.includes('signs')) {
    return <FaHeartbeat className={combinedClassName} aria-label="Vital Signs" />;
  }
  if (itemLower.includes('exam') || itemLower.includes('checkup')) {
    return <FaStethoscope className={combinedClassName} aria-label="Medical Examination" />;
  }
  if (itemLower.includes('ward') || itemLower.includes('room') || itemLower.includes('admission')) {
    return <FaHospital className={combinedClassName} aria-label="Hospital Ward" />;
  }
  if (itemLower.includes('injection') || itemLower.includes('vaccine')) {
    return <FaSyringe className={combinedClassName} aria-label="Injection/Vaccine" />;
  }
  if (itemLower.includes('scan') || itemLower.includes('imaging') || itemLower.includes('radiology')) {
    return <FaXRay className={combinedClassName} aria-label="Medical Imaging" />;
  }
  if (itemLower.includes('medicine') || itemLower.includes('drug') || itemLower.includes('pills')) {
    return <FaPills className={combinedClassName} aria-label="Medication" />;
  }
  if (itemLower.includes('temperature') || itemLower.includes('fever')) {
    return <FaThermometerHalf className={combinedClassName} aria-label="Temperature" />;
  }
  if (itemLower.includes('weight') || itemLower.includes('scale')) {
    return <FaWeight className={combinedClassName} aria-label="Weight Measurement" />;
  }
  if (itemLower.includes('eye') || itemLower.includes('vision') || itemLower.includes('ophthalmology')) {
    return <FaEye className={combinedClassName} aria-label="Eye Care" />;
  }
  if (itemLower.includes('dental') || itemLower.includes('tooth') || itemLower.includes('dentist')) {
    return <FaTooth className={combinedClassName} aria-label="Dental Care" />;
  }
  if (itemLower.includes('brain') || itemLower.includes('neuro') || itemLower.includes('mental')) {
    return <FaBrain className={combinedClassName} aria-label="Neurological Care" />;
  }
  if (itemLower.includes('lung') || itemLower.includes('respiratory') || itemLower.includes('breathing')) {
    return <FaLungs className={combinedClassName} aria-label="Respiratory Care" />;
  }
  if (itemLower.includes('first aid') || itemLower.includes('emergency kit')) {
    return <FaFirstAid className={combinedClassName} aria-label="First Aid" />;
  }
  if (itemLower.includes('microscope') || itemLower.includes('pathology')) {
    return <FaMicroscope className={combinedClassName} aria-label="Laboratory Analysis" />;
  }
  if (itemLower.includes('treatment') || itemLower.includes('therapy')) {
    return <FaHandHoldingMedical className={combinedClassName} aria-label="Medical Treatment" />;
  }
  if (itemLower.includes('blood') || itemLower.includes('bank')) {
    return <FaVials className={combinedClassName} aria-label="Blood Bank" />;
  }
  if (itemLower.includes('trauma') || itemLower.includes('critical')) {
    return <FaTruck className={combinedClassName} aria-label="Trauma Care" />;
  }
  if (itemLower.includes('icu') || itemLower.includes('intensive')) {
    return <FaHospitalAlt className={combinedClassName} aria-label="Intensive Care" />;
  }
  if (itemLower.includes('kit') || itemLower.includes('supplies')) {
    return <FaMedkit className={combinedClassName} aria-label="Medical Kit" />;
  }
  if (itemLower.includes('infection') || itemLower.includes('virus') || itemLower.includes('prevention')) {
    return <FaShieldAlt className={combinedClassName} aria-label="Infection Control" />;
  }
  if (itemLower.includes('discharge') || itemLower.includes('summary')) {
    return <FaBookMedical className={combinedClassName} aria-label="Medical Summary" />;
  }

  // Default icons
  return <FaClipboardList className={combinedClassName} aria-label="Medical Information" />;
};

// Enhanced icon collection with all available medical icons
export const MedicalIcons = {
  // Core medical staff
  FaUserMd,
  FaUserNurse,
  FaUserInjured,
  
  // Medical equipment & tools
  FaStethoscope,
  FaThermometerHalf,
  FaWeight,
  FaSyringe,
  FaMicroscope,
  
  // Body parts & specialties
  FaEye,
  FaTooth,
  FaBrain,
  FaLungs,
  FaHeartbeat,
  
  // Medications & treatments
  FaPrescriptionBottleAlt,
  FaPills,
  FaHandHoldingMedical,
  FaFirstAid,
  FaMedkit,
  
  // Facilities & services
  FaHospital,
  FaHospitalAlt,
  FaAmbulance,
  FaTruck,
  
  // Documentation & records
  FaFileMedical,
  FaBookMedical,
  FaClipboardList,
  FaCalendarAlt,
  
  // Laboratory & diagnostics
  FaVials,
  FaXRay,
  
  // Safety & prevention
  FaShieldAlt
};

// Icon size utility function
export const getIconSize = (size?: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small': return '14px';
    case 'medium': return '18px';
    case 'large': return '24px';
    default: return '16px';
  }
};

export default getMedicalIcon;