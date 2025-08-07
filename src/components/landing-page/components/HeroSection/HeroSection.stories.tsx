import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

const meta: Meta<typeof HeroSection> = {
  title: 'Landing Page/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main hero section of the landing page featuring healthcare management system branding, call-to-action buttons, and key statistics.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default hero section with all elements including title, subtitle, buttons, and statistics.',
      },
    },
  },
};

export const WithCustomViewport: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Hero section displayed on tablet viewport to show responsive behavior.',
      },
    },
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Hero section optimized for mobile devices.',
      },
    },
  },
};