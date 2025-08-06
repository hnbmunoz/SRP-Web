import React from 'react';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'right' | 'bottom' | 'left';
  disabled?: boolean;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'right',
  disabled = false,
  delay = 300
}) => {
  if (disabled) {
    return children;
  }

  const renderTooltip = (props: any) => (
    <BootstrapTooltip id="tooltip" {...props}>
      {content}
    </BootstrapTooltip>
  );

  return (
    <OverlayTrigger
      placement={position}
      delay={{ show: delay, hide: 150 }}
      overlay={renderTooltip}
    >
      {children}
    </OverlayTrigger>
  );
};

export default Tooltip;