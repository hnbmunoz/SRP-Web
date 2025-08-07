import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import { Button } from 'react-bootstrap';
import { FaInfoCircle, FaQuestionCircle, FaExclamationTriangle } from 'react-icons/fa';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    delay: {
      control: { type: 'number' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip message',
    children: <Button variant="primary">Hover me</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Click this icon for more information',
    children: <FaInfoCircle size={24} style={{ color: '#007bff', cursor: 'pointer' }} />,
    position: 'top',
  },
};

export const TopPosition: Story = {
  args: {
    content: 'Tooltip positioned at the top',
    children: <Button variant="secondary">Top Tooltip</Button>,
    position: 'top',
  },
};

export const BottomPosition: Story = {
  args: {
    content: 'Tooltip positioned at the bottom',
    children: <Button variant="success">Bottom Tooltip</Button>,
    position: 'bottom',
  },
};

export const LeftPosition: Story = {
  args: {
    content: 'Tooltip positioned to the left',
    children: <Button variant="warning">Left Tooltip</Button>,
    position: 'left',
  },
};

export const RightPosition: Story = {
  args: {
    content: 'Tooltip positioned to the right',
    children: <Button variant="info">Right Tooltip</Button>,
    position: 'right',
  },
};

export const LongContent: Story = {
  args: {
    content: 'This is a very long tooltip message that demonstrates how the tooltip handles longer text content. It should wrap appropriately and remain readable.',
    children: <Button variant="dark">Long Tooltip</Button>,
    position: 'top',
  },
};

export const QuickDelay: Story = {
  args: {
    content: 'This tooltip appears quickly',
    children: <Button variant="outline-primary">Quick Tooltip</Button>,
    delay: 100,
  },
};

export const SlowDelay: Story = {
  args: {
    content: 'This tooltip takes longer to appear',
    children: <Button variant="outline-secondary">Slow Tooltip</Button>,
    delay: 1000,
  },
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled and will not show',
    children: <Button variant="outline-danger">Disabled Tooltip</Button>,
    disabled: true,
  },
};

export const WithWarningIcon: Story = {
  args: {
    content: 'Warning: This action cannot be undone',
    children: <FaExclamationTriangle size={20} style={{ color: '#ffc107', cursor: 'pointer' }} />,
    position: 'bottom',
  },
};

export const WithHelpIcon: Story = {
  args: {
    content: 'Need help? Click here to learn more about this feature',
    children: <FaQuestionCircle size={18} style={{ color: '#6c757d', cursor: 'pointer' }} />,
    position: 'right',
  },
};