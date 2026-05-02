import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDE_COUNT = 3;
const INTERVAL_MS = 15_000;
const SWIPE_MIN_PX = 48;

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % SLIDE_COUNT);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    const id = window.setInterval(goNext, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const endX = e.changedTouches[0].clientX;
    const dx = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) < SWIPE_MIN_PX) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  return (
    <div className="homeCarousel">
      <div className="homeCarouselTopBar">
        <a className="homeCarouselSearchLink" href="#" onClick={(ev) => ev.preventDefault()}>
          Rechercher des pièces
        </a>
      </div>
      <div
        className="homeCarouselViewport"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="region"
        aria-roledescription="carousel"
        aria-label="Diapositives"
      >
        <div
          className="homeCarouselTrack"
          style={{ transform: `translate3d(-${activeIndex * (100 / SLIDE_COUNT)}%, 0, 0)` }}
        >
          <div className="homeCarouselSlide" aria-hidden={activeIndex !== 0}>
            <figure className="homeCarouselFigure">
              <img
                className="homeCarouselHeroImg"
                src="/mike.jpg"
                alt=""
                width={1080}
                height={1920}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
          <div className="homeCarouselSlide" aria-hidden={activeIndex !== 1}>
            <div className="homeCarouselPlaceholder homeCarouselPlaceholderPlan">
              <h2 className="homeCarouselPlaceholderTitle">Plan du site</h2>
              <p className="homeCarouselPlaceholderText">Un PDF sera ajouté ici prochainement.</p>
            </div>
          </div>
          <div className="homeCarouselSlide" aria-hidden={activeIndex !== 2}>
            <div className="homeCarouselPlaceholder homeCarouselPlaceholderPub">
              <h2 className="homeCarouselPlaceholderTitle">Publicité</h2>
              <p className="homeCarouselPlaceholderText">Exemple d’emplacement pour une annonce ou une promotion.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="homeCarouselDots" role="tablist" aria-label="Choisir une diapositive">
        {Array.from({ length: SLIDE_COUNT }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className="homeCarouselDot"
            aria-selected={activeIndex === i}
            aria-label={`Diapositive ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
