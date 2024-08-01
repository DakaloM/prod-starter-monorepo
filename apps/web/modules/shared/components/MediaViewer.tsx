'use client';

import { memo, useMemo } from 'react';

import { PDFViewer } from './PDFViewer';

enum MEDIA {
  UNSUPPORTED = 'UNSUPPORTED',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  PDF = 'PDF',
}

enum ClassName {
  Image = 'absolute top-0 w-auto h-full object-contain mx-auto object-center z-10',
}

/**
 * Renders any given media
 */
export function MediaViewer({ src, title, contentType, width, height }: MediaViewerProps) {
  const mediaType = useMemo(() => {
    if (contentType.startsWith('image/')) {
      return MEDIA.IMAGE;
    } else if (contentType.startsWith('video/')) {
      return MEDIA.VIDEO;
    } else if (contentType === 'application/pdf') {
      return MEDIA.PDF;
    }

    console.log('UNSUPPORTED MEDIA FILE', { src, contentType });

    return MEDIA.UNSUPPORTED;
  }, [contentType, src]);

  const defaultProps = useMemo(
    () => ({
      height: height || '100%',
      src: src,
      width: width || '100%',
    }),
    [height, src, width],
  );

  switch (mediaType) {
    case MEDIA.IMAGE:
      return <img src={src} alt={title} className={ClassName.Image} />;
    case MEDIA.VIDEO:
      return (
        <video {...defaultProps} controls role="video">
          Your browser does not support the video element.
        </video>
      );
    case MEDIA.PDF:
      return <PDFViewer url={src} />;
    case MEDIA.UNSUPPORTED:
    default:
      return (
        <p>
          UNSUPPORTED MEDIA TYPE: <a href={src}>Download</a>
        </p>
      );
  }
}
export const SharedMediaViewer = memo(MediaViewer);
export interface MediaViewerProps {
  src: string;
  title: string;
  width?: string;
  height?: string;
  contentType: string;
}
