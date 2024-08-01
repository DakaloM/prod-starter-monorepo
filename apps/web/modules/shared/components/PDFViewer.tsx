'use client';

/* eslint-disable no-restricted-imports */
import { Button } from '@imax/ui';

import Link from 'next/link';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

export function PDFViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(numPages);
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, numPages));

  return (
    <section className="mt-4 flex flex-col items-center w-full min-h-max gap-4">
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="h-[74vh] w-full overflow-y-auto flex flex-col items-center"
      >
        <Page className="absolute top-0 bg-black border shadow-lg" pageNumber={currentPage} />
      </Document>
      {numPages > 0 && (
        <div className="w-[500px] flex flex-wrap justify-center gap-2">
          <Button
            variant="link"
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            aria-label="Go to first page"
          >
            First
          </Button>
          <Button
            variant="link"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Prev
          </Button>

          <Button
            variant="link"
            onClick={goToNextPage}
            disabled={currentPage === numPages}
            aria-label="Go to next page"
          >
            Next
          </Button>
          <Button
            variant="link"
            onClick={goToLastPage}
            disabled={currentPage === numPages}
            aria-label="Go to last page"
          >
            Last
          </Button>
        </div>
      )}

      <span className='text-sm font-semibold text-gray-500'>
        Page {currentPage} of {numPages}
      </span>
    </section>
  );
}

type PdfViewerProps = {
  url: string;
};
