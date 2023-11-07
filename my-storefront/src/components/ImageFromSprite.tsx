import React, { CSSProperties } from 'react';

type ImageFromSpriteProps = {
  src: string;
  position: number;
  scale?: number; // Optional prop for scaling the image
};

const ImageFromSprite: React.FC<ImageFromSpriteProps> = ({ src, position, scale = 1 }) => {
  // Original size of one image
  const originalWidth = 445;
  const originalHeight = 448;

  // New size based on the scale
  const width = `${originalWidth * scale}px`;
  const height = `${originalHeight * scale}px`;

  // Calculate background position based on the index
  // Assuming the positions are 0, 1, 2, or 3
  const positions: CSSProperties[] = [
    { backgroundPosition: '0px 0px' }, // Top-left image
    { backgroundPosition: `${-originalWidth * scale}px 0px` }, // Top-right image
    { backgroundPosition: `0px ${-originalHeight * scale}px` }, // Bottom-left image
    { backgroundPosition: `${-originalWidth * scale}px ${-originalHeight * scale}px` }, // Bottom-right image
  ];

  // Create a style object for inline styles
  const style: CSSProperties = {
    width,
    height,
    backgroundImage: `url(${src})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${originalWidth * 2 * scale}px ${originalHeight * 2 * scale}px`, // the size of the entire sprite image
    ...positions[position]
  };

  return <div style={style} />;
};

export default ImageFromSprite;
