import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import CallToActionSection from './CallToActionSection';

const meta: Meta<typeof CallToActionSection> = {
  title: 'Landing Page/CallToActionSection',
  component: CallToActionSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Call-to-action section with email signup form, action buttons, testimonial, and trust indicators to encourage user conversion.',
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
        story: 'The complete call-to-action section with email form, action buttons, testimonial, and trust indicators.',
      },
    },
  },
};

export const WithInteraction: Story = {
  parameters: {
    docs: {
      description: {
        story: 'CTA section showing interactive elements like form submission and button clicks.',
      },
    },
  },
  play: async ({ canvasElement: _canvasElement }) => {
    // This would be used for interaction testing in a real scenario
    // For now, it just shows the component in its default state
  },
};

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Call-to-action section optimized for mobile devices with stacked layout.',
      },
    },
  },
};

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'CTA section on tablet viewport showing responsive behavior.',
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
        story: 'Full desktop view with side-by-side layout of content and form.',
      },
    },
  },
};