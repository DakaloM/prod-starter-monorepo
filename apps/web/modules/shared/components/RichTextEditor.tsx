'use client';

import { cn } from '@imax/ui';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
// eslint-disable-next-line no-restricted-imports
import 'react-quill/dist/quill.snow.css';

export const RichTextEditor = ({ value, setValue, className }: RichTextEditorProps) => {

  const handleChange = (content: string) => {
    setValue(content);
  };

  return (
    <div className={cn("w-full p-8 shadow-lg", className)}>
      <ReactQuill value={value} onChange={handleChange} />
    </div>
  );
};


type RichTextEditorProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  className?: string
}

