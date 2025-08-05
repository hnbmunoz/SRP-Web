import React from 'react';
// Hero Icons (Outline)
import {
  UserIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  HeartIcon,
  BuildingOffice2Icon,
  TruckIcon,
  DocumentTextIcon,
  EyeIcon,
  HomeIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

// Bootstrap Icons (using react-bootstrap-icons)
import {
  PersonFill,
  Calendar3,
  ClipboardData,
  Flask,
  Heart,
  Building,
  Truck,
  FileText,
  Eye,
  House,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gear,
  BoxArrowRight
} from 'react-bootstrap-icons';

export type IconLibrary = 'fontawesome' | 'heroicons' | 'bootstrap';

interface IconMapperProps {
  library?: IconLibrary;
  title: string;
  itemName?: string;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

// Hero Icons mapping
const getHeroIcon = (title: string, itemName?: string, className?: string) => {
  const titleLower = title.toLowerCase();
  const itemLower = itemName?.toLowerCase() || '';

  // Main module icons
  if (titleLower.includes('patient') || titleLower.includes('module 1')) {
    return <UserIcon className={className} aria-label="Patient Management" />;
  }
  if (titleLower.includes('appointment') || titleLower.includes('module 2') || titleLower.includes('clinical')) {
    return <CalendarIcon className={className} aria-label="Clinical Operations" />;
  }
  if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
    return <TruckIcon className={className} aria-label="Emergency Services" />;
  }
  if (titleLower.includes('lab') || titleLower.includes('test') || titleLower.includes('diagnostic')) {
    return <BeakerIcon className={className} aria-label="Laboratory & Diagnostics" />;
  }

  // Sub-item icons
  if (itemLower.includes('record') || itemLower.includes('file') || itemLower.includes('history')) {
    return <DocumentTextIcon className={className} aria-label="Medical Records" />;
  }
  if (itemLower.includes('vital') || itemLower.includes('monitor') || itemLower.includes('signs')) {
    return <HeartIcon className={className} aria-label="Vital Signs" />;
  }
  if (itemLower.includes('ward') || itemLower.includes('room') || itemLower.includes('admission')) {
    return <BuildingOffice2Icon className={className} aria-label="Hospital Ward" />;
  }
  if (itemLower.includes('eye') || itemLower.includes('vision')) {
    return <EyeIcon className={className} aria-label="Eye Care" />;
  }

  // Default
  return <ClipboardDocumentListIcon className={className} aria-label="Medical Information" />;
};

// Bootstrap Icons mapping
const getBootstrapIcon = (title: string, itemName?: string, className?: string) => {
  const titleLower = title.toLowerCase();
  const itemLower = itemName?.toLowerCase() || '';

  // Main module icons
  if (titleLower.includes('patient') || titleLower.includes('module 1')) {
    return <PersonFill className={className} aria-label="Patient Management" />;
  }
  if (titleLower.includes('appointment') || titleLower.includes('module 2') || titleLower.includes('clinical')) {
    return <Calendar3 className={className} aria-label="Clinical Operations" />;
  }
  if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
    return <Truck className={className} aria-label="Emergency Services" />;
  }
  if (titleLower.includes('lab') || titleLower.includes('test') || titleLower.includes('diagnostic')) {
    return <Flask className={className} aria-label="Laboratory & Diagnostics" />;
  }

  // Sub-item icons
  if (itemLower.includes('record') || itemLower.includes('file') || itemLower.includes('history')) {
    return <FileText className={className} aria-label="Medical Records" />;
  }
  if (itemLower.includes('vital') || itemLower.includes('monitor') || itemLower.includes('signs')) {
    return <Heart className={className} aria-label="Vital Signs" />;
  }
  if (itemLower.includes('ward') || itemLower.includes('room') || itemLower.includes('admission')) {
    return <Building className={className} aria-label="Hospital Ward" />;
  }
  if (itemLower.includes('eye') || itemLower.includes('vision')) {
    return <Eye className={className} aria-label="Eye Care" />;
  }

  // Default
  return <ClipboardData className={className} aria-label="Medical Information" />;
};

// Main alternative icon mapper function
export const getAlternativeIcon = ({ 
  library = 'heroicons', 
  title, 
  itemName, 
  className, 
  size 
}: IconMapperProps) => {
  // Size classes
  const sizeClass = size ? `icon-${size}` : '';
  const combinedClassName = `${className || ''} ${sizeClass}`.trim();

  switch (library) {
    case 'heroicons':
      return getHeroIcon(title, itemName, combinedClassName);
    case 'bootstrap':
      return getBootstrapIcon(title, itemName, combinedClassName);
    default:
      return getHeroIcon(title, itemName, combinedClassName);
  }
};

// Utility icons for common UI elements
export const getUtilityIcon = (iconName: string, library: IconLibrary = 'heroicons', className?: string) => {
  switch (library) {
    case 'heroicons':
      switch (iconName) {
        case 'home': return <HomeIcon className={className} />;
        case 'chevron-down': return <ChevronDownIcon className={className} />;
        case 'chevron-left': return <ChevronLeftIcon className={className} />;
        case 'chevron-right': return <ChevronRightIcon className={className} />;
        case 'settings': return <Cog6ToothIcon className={className} />;
        case 'logout': return <ArrowRightOnRectangleIcon className={className} />;
        default: return <HomeIcon className={className} />;
      }
    case 'bootstrap':
      switch (iconName) {
        case 'home': return <House className={className} />;
        case 'chevron-down': return <ChevronDown className={className} />;
        case 'chevron-left': return <ChevronLeft className={className} />;
        case 'chevron-right': return <ChevronRight className={className} />;
        case 'settings': return <Gear className={className} />;
        case 'logout': return <BoxArrowRight className={className} />;
        default: return <House className={className} />;
      }
    default:
      return <HomeIcon className={className} />;
  }
};

// Export available libraries for easy switching
export const IconLibraries = {
  FONTAWESOME: 'fontawesome' as IconLibrary,
  HEROICONS: 'heroicons' as IconLibrary,
  BOOTSTRAP: 'bootstrap' as IconLibrary
};

export default getAlternativeIcon;