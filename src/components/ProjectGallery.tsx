import { useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, ZoomOut } from 'lucide-react';
import { flushSync } from 'react-dom';
import dimensions from '../generated/image-dimensions.json';
const sizes: Record<string, { width: number; height: number }> = dimensions;
export function ProjectGallery({ name, images }: { name: string; images: string[] }) {
  const id = useId();
  const track = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const transition = useRef<ViewTransition | null>(null);
  function updateViewer(index: number | null) {
    const update = () => {
      flushSync(() => {
        if (index === null && viewer !== null) setActive(viewer);
        setViewer(index);
        setZoomed(false);
      });
      if (index === null) {
        dialog.current?.close();
        if (viewer !== null && track.current) {
          track.current.scrollTo({ left: viewer * track.current.clientWidth, behavior: 'instant' });
          track.current
            .querySelectorAll<HTMLAnchorElement>('.gallery-slide a')
            [viewer]?.focus({ preventScroll: true });
        }
      } else if (!dialog.current?.open) dialog.current?.showModal();
    };
    transition.current?.skipTransition();
    if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const next = document.startViewTransition(update);
      transition.current = next;
      void next.ready.catch(() => {
        /* A skipped visual transition still applies its DOM update. */
      });
      void next.finished
        .catch(() => {})
        .finally(() => {
          if (transition.current === next) transition.current = null;
        });
    } else update();
  }
  function move(direction: number) {
    const element = track.current;
    if (element) element.scrollBy({ left: direction * element.clientWidth });
  }
  return (
    <section
      className="project-gallery"
      aria-label={`${name} screenshots`}
      aria-roledescription="carousel"
    >
      <div className="gallery-toolbar">
        <p>Inside {name}</p>
        <div className="gallery-controls">
          <span className="gallery-position" aria-live="polite" aria-atomic="true">
            {active + 1} / {images.length}
          </span>
          <button
            type="button"
            aria-label="Previous screenshot"
            aria-controls={id}
            disabled={active === 0}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next screenshot"
            aria-controls={id}
            disabled={active === images.length - 1}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      <section
        className="gallery-track"
        id={id}
        ref={track}
        // A scrollable region needs a keyboard focus stop for its arrow-key controls.
        // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label="Project screenshots. Swipe or use left and right arrow keys."
        onScroll={(event) => {
          const element = event.currentTarget;
          setActive(
            Math.max(
              0,
              Math.min(images.length - 1, Math.round(element.scrollLeft / element.clientWidth)),
            ),
          );
        }}
      >
        {images.map((image, index) => (
          <figure
            className="gallery-slide"
            key={image}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${images.length}`}
          >
            <a
              href={image}
              aria-haspopup="dialog"
              aria-label={`View ${name} screenshot ${index + 1}`}
              onClick={(event) => {
                event.preventDefault();
                updateViewer(index);
              }}
            >
              <img
                src={image}
                width={sizes[image]?.width}
                height={sizes[image]?.height}
                alt={
                  image.endsWith('.svg')
                    ? `${name} project overview`
                    : `${name}, original project screenshot ${index + 1}`
                }
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                style={{
                  viewTransitionName:
                    viewer === null && active === index ? 'project-image' : 'none',
                }}
              />
            </a>
          </figure>
        ))}
      </section>
      <p className="gallery-hint">
        Swipe or use the arrows to explore. Select an image for a closer look.
      </p>
      <dialog
        ref={dialog}
        className="image-viewer"
        aria-labelledby={`${id}-viewer-title`}
        onCancel={(event) => {
          event.preventDefault();
          updateViewer(null);
        }}
      >
        <div className="viewer-toolbar">
          <h2 id={`${id}-viewer-title`}>
            {name}
            <span aria-live="polite" aria-atomic="true">
              Screenshot {(viewer ?? 0) + 1} of {images.length}
            </span>
          </h2>
          <div className="viewer-controls">
            <button
              type="button"
              aria-label={zoomed ? 'Fit image to screen' : 'Zoom image'}
              aria-pressed={zoomed}
              onClick={() => setZoomed(!zoomed)}
            >
              {zoomed ? (
                <ZoomOut size={20} aria-hidden="true" />
              ) : (
                <ZoomIn size={20} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              aria-label="Close image viewer"
              onClick={() => updateViewer(null)}
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
        {viewer !== null && (
          <div className={`viewer-stage${zoomed ? ' is-zoomed' : ''}`}>
            <img
              src={images[viewer]}
              alt={`${name}, screenshot ${viewer + 1}`}
              width={sizes[images[viewer]]?.width}
              height={sizes[images[viewer]]?.height}
              style={{ viewTransitionName: 'project-image' }}
            />
          </div>
        )}
        <div className="viewer-bottom">
          <p>
            {zoomed ? 'Scroll to explore the image.' : 'A closer look at the original screenshot.'}
          </p>
          <div className="viewer-controls">
            <button
              type="button"
              aria-label="Previous image in viewer"
              disabled={viewer === null || viewer === 0}
              onClick={() => updateViewer((viewer ?? 0) - 1)}
            >
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next image in viewer"
              disabled={viewer === null || viewer === images.length - 1}
              onClick={() => updateViewer((viewer ?? 0) + 1)}
            >
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </section>
  );
}
