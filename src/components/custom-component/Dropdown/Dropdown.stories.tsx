import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { UserIcon, MapPinIcon, StarIcon, HeartIcon } from '@heroicons/react/24/outline';
import Dropdown from './Dropdown';
import type { DropdownOption } from './Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Custom/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A reusable dropdown component built with React Select, featuring customizable styling, multi-select support, icons, and various size and variant options.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the dropdown',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outlined', 'filled'],
      description: 'Visual variant of the dropdown',
    },
    isMulti: {
      control: { type: 'boolean' },
      description: 'Enable multi-select functionality',
    },
    isSearchable: {
      control: { type: 'boolean' },
      description: 'Enable search functionality',
    },
    isClearable: {
      control: { type: 'boolean' },
      description: 'Enable clear functionality',
    },
    isDisabled: {
      control: { type: 'boolean' },
      description: 'Disable the dropdown',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Show loading state',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Mark field as required',
    },
    menuPlacement: {
      control: { type: 'select' },
      options: ['auto', 'bottom', 'top'],
      description: 'Menu placement relative to control',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample options for stories
const basicOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4', isDisabled: true },
  { value: 'option5', label: 'Option 5' },
];

const countryOptions: DropdownOption[] = [
  { value: 'us', label: 'United States', icon: <MapPinIcon /> },
  { value: 'ca', label: 'Canada', icon: <MapPinIcon /> },
  { value: 'uk', label: 'United Kingdom', icon: <MapPinIcon /> },
  { value: 'de', label: 'Germany', icon: <MapPinIcon /> },
  { value: 'fr', label: 'France', icon: <MapPinIcon /> },
  { value: 'jp', label: 'Japan', icon: <MapPinIcon /> },
  { value: 'au', label: 'Australia', icon: <MapPinIcon /> },
];

const userOptions: DropdownOption[] = [
  { value: 'john', label: 'John Doe', icon: <UserIcon /> },
  { value: 'jane', label: 'Jane Smith', icon: <UserIcon /> },
  { value: 'bob', label: 'Bob Johnson', icon: <UserIcon /> },
  { value: 'alice', label: 'Alice Brown', icon: <UserIcon /> },
];

const priorityOptions: DropdownOption[] = [
  { value: 'low', label: 'Low Priority', icon: <StarIcon />, color: '#6c757d' },
  { value: 'medium', label: 'Medium Priority', icon: <StarIcon />, color: '#ffc107' },
  { value: 'high', label: 'High Priority', icon: <StarIcon />, color: '#fd7e14' },
  { value: 'urgent', label: 'Urgent', icon: <StarIcon />, color: '#dc3545' },
];

// Default story
export const Default: Story = {
  args: {
    label: 'Select an option',
    options: basicOptions,
    placeholder: 'Choose an option...',
    onChange: action('onChange'),
    onInputChange: action('onInputChange'),
    onMenuOpen: action('onMenuOpen'),
    onMenuClose: action('onMenuClose'),
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    label: 'Select Country',
    options: countryOptions,
    placeholder: 'Choose a country...',
    icon: <MapPinIcon />,
    onChange: action('onChange'),
  },
};

// Multi-select
export const MultiSelect: Story = {
  args: {
    label: 'Select Users',
    options: userOptions,
    placeholder: 'Choose users...',
    isMulti: true,
    isClearable: true,
    icon: <UserIcon />,
    onChange: action('onChange'),
  },
};

// Different sizes
export const Small: Story = {
  args: {
    label: 'Small Dropdown',
    options: basicOptions,
    size: 'small',
    placeholder: 'Small size...',
    onChange: action('onChange'),
  },
};

export const Large: Story = {
  args: {
    label: 'Large Dropdown',
    options: basicOptions,
    size: 'large',
    placeholder: 'Large size...',
    onChange: action('onChange'),
  },
};

// Different variants
export const Outlined: Story = {
  args: {
    label: 'Outlined Variant',
    options: basicOptions,
    variant: 'outlined',
    placeholder: 'Outlined style...',
    onChange: action('onChange'),
  },
};

export const Filled: Story = {
  args: {
    label: 'Filled Variant',
    options: basicOptions,
    variant: 'filled',
    placeholder: 'Filled style...',
    onChange: action('onChange'),
  },
};

// With error state
export const WithError: Story = {
  args: {
    label: 'Required Field',
    options: basicOptions,
    placeholder: 'This field has an error...',
    required: true,
    error: 'This field is required',
    onChange: action('onChange'),
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Select Priority',
    options: priorityOptions,
    placeholder: 'Choose priority level...',
    helperText: 'Select the priority level for this task',
    onChange: action('onChange'),
  },
};

// Loading state
export const Loading: Story = {
  args: {
    label: 'Loading Options',
    options: [],
    placeholder: 'Loading...',
    isLoading: true,
    onChange: action('onChange'),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Dropdown',
    options: basicOptions,
    placeholder: 'This is disabled...',
    isDisabled: true,
    onChange: action('onChange'),
  },
};

// Not searchable
export const NotSearchable: Story = {
  args: {
    label: 'Not Searchable',
    options: basicOptions,
    placeholder: 'Cannot search...',
    isSearchable: false,
    onChange: action('onChange'),
  },
};

// With clearable option
export const Clearable: Story = {
  args: {
    label: 'Clearable Dropdown',
    options: basicOptions,
    placeholder: 'Can be cleared...',
    isClearable: true,
    value: basicOptions[0],
    onChange: action('onChange'),
  },
};

// Custom menu placement
export const MenuTop: Story = {
  args: {
    label: 'Menu Opens Upward',
    options: basicOptions,
    placeholder: 'Menu opens up...',
    menuPlacement: 'top',
    onChange: action('onChange'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with menu that opens upward instead of downward.',
      },
    },
  },
};

// Complex example with all features
export const ComplexExample: Story = {
  args: {
    label: 'Advanced Dropdown',
    options: [
      ...countryOptions,
      ...userOptions.map(user => ({ ...user, value: `user-${user.value}` })),
      ...priorityOptions.map(priority => ({ ...priority, value: `priority-${priority.value}` })),
    ],
    placeholder: 'Search and select multiple items...',
    isMulti: true,
    isSearchable: true,
    isClearable: true,
    size: 'medium',
    variant: 'outlined',
    icon: <HeartIcon />,
    helperText: 'You can search, select multiple items, and clear selections',
    maxMenuHeight: 200,
    closeMenuOnSelect: false,
    hideSelectedOptions: false,
    onChange: action('onChange'),
    onInputChange: action('onInputChange'),
    onMenuOpen: action('onMenuOpen'),
    onMenuClose: action('onMenuClose'),
  },
  parameters: {
    docs: {
      description: {
        story: 'A complex example showcasing multiple features: multi-select, search, icons, custom styling, and various interaction handlers.',
      },
    },
  },
};

// Playground story for interactive testing
export const Playground: Story = {
  args: {
    label: 'Playground Dropdown',
    options: basicOptions,
    placeholder: 'Customize me in controls...',
    size: 'medium',
    variant: 'default',
    isMulti: false,
    isSearchable: true,
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    required: false,
    menuPlacement: 'auto',
    onChange: action('onChange'),
    onInputChange: action('onInputChange'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Use the controls panel to experiment with different props and see how they affect the dropdown behavior.',
      },
    },
  },
};