import { useCallback, useEffect, useState, type MouseEvent } from 'react';
import { CarouselTopBar } from './CarouselTopBar';
import { EmbeddedBrowseOverlay } from './EmbeddedBrowseOverlay';
import { HeroSlide } from './HeroSlide';
import { PlanSlide } from './PlanSlide';
import { PubSlide } from './PubSlide';

const SLIDE_COUNT = 3;
const INTERVAL_MS = 10000;
const RONA_SEARCH_URL = 'https://www.rona.ca/';

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);
  const [embeddedBrowseUrl, setEmbeddedBrowseUrl] = useState<string | null>(null);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext, autoplayResetKey]);

  const onViewportTap = () => {
    goNext();
    setAutoplayResetKey((k) => k + 1);
  };

  const openRonaInApp = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setEmbeddedBrowseUrl(RONA_SEARCH_URL);
  };

  const closeEmbeddedBrowse = () => setEmbeddedBrowseUrl(null);

  return (
    <div className="homeCarousel">
      <div className="homeCarouselStage">
        <CarouselTopBar searchUrl={RONA_SEARCH_URL} onOpenSearch={openRonaInApp} />
        <div
          className="homeCarouselViewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Diapositives"
          onClick={onViewportTap}
        >
          <div className="homeCarouselStack">
            <HeroSlide isActive={activeIndex === 0} />
            <PlanSlide isActive={activeIndex === 1} />
            <PubSlide isActive={activeIndex === 2} />
          </div>
        </div>
      </div>

      {embeddedBrowseUrl ? (
        <EmbeddedBrowseOverlay url={embeddedBrowseUrl} onClose={closeEmbeddedBrowse} />
      ) : null}
    </div>
  );
}
