import React, { useState } from 'react';

type HoverLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  style: React.CSSProperties;
  hoverStyle: React.CSSProperties;
};

export const HoverLink: React.FC<HoverLinkProps> = ({ style, hoverStyle, children, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      style={{ ...style, ...(hovered ? hoverStyle : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...rest}
    >
      {children}
    </a>
  );
};
