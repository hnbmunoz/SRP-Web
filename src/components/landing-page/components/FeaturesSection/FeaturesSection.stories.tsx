import type { Meta, StoryObj } from '@storybook/react';
import FeaturesSection from './FeaturesSection';

const meta: Meta<typeof FeaturesSection> = {
  title: 'Landing Page/FeaturesSection',
  component: FeaturesSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Features section showcasing the key capabilities of the healthcare management system with feature cards, benefits, and statistics.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete features section with all 6 feature cards, benefits lists, and statistics section.',
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
        story: 'Features section displayed on tablet viewport showing responsive grid layout.',
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
        story: 'Features section optimized for mobile devices with stacked card layout.',
      },
    },
  },
};

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Features section on desktop with full 3-column grid layout.',
      },
    },
  },
};