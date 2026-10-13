import { useEffect, useRef, useState } from 'react';
import { getDocument, GlobalWorkerOptions, type PDFDocumentProxy } from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

GlobalWorkerOptions.workerSrc = workerUrl;

export default function PdfPreview({ src, title }: { src: string; title: string }) {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadingTask = getDocument({ url: src });

    loadingTask.promise.then(
      (pdf) => {
        if (!cancelled) setDocument(pdf);
      },
      (reason: unknown) => {
        if (!cancelled) {
          const details = reason instanceof Error ? reason.message : String(reason);
          setError(`Unable to load this PDF. Check that the file is available and served with application/pdf. ${details}`);
        }
      },
    );

    return () => {
      cancelled = true;
      void loadingTask.destroy();
    };
  }, [src]);

  if (error) {
    return <p className="pdf-preview-error" role="alert">{error}</p>;
  }

  if (!document) {
    return <p className="pdf-preview-loading" role="status">Loading PDF preview…</p>;
  }

  return (
    <div className="pdf-preview" aria-label={`${title} PDF pages`}>
      {Array.from({ length: document.numPages }, (_, index) => (
        <PdfPage key={index + 1} document={document} pageNumber={index + 1} title={title} />
      ))}
    </div>
  );
}

function PdfPage({
  document,
  pageNumber,
  title,
}: {
  document: PDFDocumentProxy;
  pageNumber: number;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const [aspectRatio, setAspectRatio] = useState(1 / Math.SQRT2);
  const [renderState, setRenderState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '350px 0px' },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateWidth = () => setContainerWidth(container.clientWidth);
    updateWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateWidth);
      return () => window.removeEventListener('resize', updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!isNearViewport || !containerWidth || !canvas) return;

    let cancelled = false;
    let cancelRender: (() => void) | undefined;
    setRenderState('loading');

    document.getPage(pageNumber).then((page) => {
      if (cancelled) return;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: containerWidth / unscaledViewport.width });
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas rendering is not supported in this browser.');

      setAspectRatio(viewport.width / viewport.height);
      canvas.width = Math.ceil(viewport.width * pixelRatio);
      canvas.height = Math.ceil(viewport.height * pixelRatio);

      const renderTask = page.render({
        canvasContext: context,
        viewport,
        transform: pixelRatio === 1 ? undefined : [pixelRatio, 0, 0, pixelRatio, 0, 0],
      });
      cancelRender = () => renderTask.cancel();
      return renderTask.promise;
    }).then(() => {
      if (!cancelled) setRenderState('ready');
    }).catch((reason: unknown) => {
      if (cancelled || (reason instanceof Error && reason.name === 'RenderingCancelledException')) return;
      setRenderState('error');
    });

    return () => {
      cancelled = true;
      cancelRender?.();
    };
  }, [containerWidth, document, isNearViewport, pageNumber]);

  return (
    <div
      ref={containerRef}
      className="pdf-page"
      style={{ aspectRatio }}
      aria-label={`${title}, page ${pageNumber}`}
    >
      {isNearViewport ? (
        <>
          <canvas ref={canvasRef} className="pdf-page-canvas" aria-label={`${title}, page ${pageNumber}`} />
          {renderState === 'loading' && <p className="pdf-page-status" role="status">Rendering page {pageNumber}…</p>}
          {renderState === 'error' && <p className="pdf-page-status pdf-preview-error" role="alert">Could not render page {pageNumber}.</p>}
        </>
      ) : (
        <div className="pdf-page-placeholder" aria-hidden="true" />
      )}
    </div>
  );
}
