"use client";
import DOMPurify from 'dompurify';
import React from 'react';

export const RichTextRender = ({ htmlString }: RichTextRendererProps) => {
  const sanitizedHTML = DOMPurify.sanitize(htmlString);

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

type RichTextRendererProps = {
  htmlString: string;
};
