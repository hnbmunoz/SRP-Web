import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FormField from './FormField';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';

const meta: Meta<typeof FormField> = {
  title: 'Components/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'tel', 'date', 'password'],
    },
    isEditing: {
      control: { type: 'boolean' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: {
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Full Name',
    value: 'John Doe',
    placeholder: 'Enter your full name',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email Address',
    value: 'john.doe@example.com',
    type: 'email',
    icon: <FaEnvelope />,
    placeholder: 'Enter your email',
  },
};

export const EditingMode: Story = {
  args: {
    label: 'Phone Number',
    value: '+1 (555) 123-4567',
    type: 'tel',
    icon: <FaPhone />,
    isEditing: true,
    placeholder: 'Enter your phone number',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    value: '',
    icon: <FaUser />,
    isEditing: true,
    required: true,
    placeholder: 'Enter your username',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    value: 'secretpassword',
    type: 'password',
    icon: <FaLock />,
    isEditing: true,
    placeholder: 'Enter your password',
  },
};

export const Loading: Story = {
  args: {
    label: 'Profile Data',
    value: '',
    isLoading: true,
    icon: <FaUser />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    value: 'ACC-12345',
    disabled: true,
    isEditing: true,
  },
};

export const Empty: Story = {
  args: {
    label: 'Bio',
    value: '',
    placeholder: 'Tell us about yourself',
  },
};