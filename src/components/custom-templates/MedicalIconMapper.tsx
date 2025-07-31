import {
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaStethoscope,
  FaHospital,
  FaAmbulance,
  FaUserInjured,
  FaFileMedical,
  FaVials,
  FaSyringe,
  FaXRay,
  FaPills
} from 'react-icons/fa';

// Medical icon mapping function
export const getMedicalIcon = (title: string, itemName?: string, className?: string) => {
  const titleLower = title.toLowerCase();
  const itemLower = itemName?.toLowerCase() || '';

  // Main module icons
  if (titleLower.includes('patient') || titleLower.includes('module 1')) {
    return <FaUserInjured className={className} />;
  }
  if (titleLower.includes('appointment') || titleLower.includes('module 2')) {
    return <FaCalendarAlt className={className} />;
  }
  if (titleLower.includes('doctor') || titleLower.includes('physician')) {
    return <FaUserMd className={className} />;
  }
  if (titleLower.includes('prescription') || titleLower.includes('medication')) {
    return <FaPrescriptionBottleAlt className={className} />;
  }
  if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
    return <FaAmbulance className={className} />;
  }
  if (titleLower.includes('lab') || titleLower.includes('test')) {
    return <FaVials className={className} />;
  }

  // Sub-item icons
  if (itemLower.includes('record') || itemLower.includes('file')) {
    return <FaFileMedical className={className} />;
  }
  if (itemLower.includes('vital') || itemLower.includes('monitor')) {
    return <FaHeartbeat className={className} />;
  }
  if (itemLower.includes('exam') || itemLower.includes('checkup')) {
    return <FaStethoscope className={className} />;
  }
  if (itemLower.includes('ward') || itemLower.includes('room')) {
    return <FaHospital className={className} />;
  }
  if (itemLower.includes('injection') || itemLower.includes('vaccine')) {
    return <FaSyringe className={className} />;
  }
  if (itemLower.includes('scan') || itemLower.includes('imaging')) {
    return <FaXRay className={className} />;
  }
  if (itemLower.includes('medicine') || itemLower.includes('drug')) {
    return <FaPills className={className} />;
  }

  // Default icons
  return <FaClipboardList className={className} />;
};

// Optional: Export individual icon components if needed elsewhere
export const MedicalIcons = {
  FaUserMd,
  FaCalendarAlt,
  FaClipboardList,
  FaPrescriptionBottleAlt,
  FaHeartbeat,
  FaStethoscope,
  FaHospital,
  FaAmbulance,
  FaUserInjured,
  FaFileMedical,
  FaVials,
  FaSyringe,
  FaXRay,
  FaPills
};

export default getMedicalIcon;