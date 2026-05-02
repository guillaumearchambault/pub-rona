import { useCallback, useEffect, useState } from 'react';

const SLIDE_COUNT = 3;
const INTERVAL_MS = 10000;

export default function HomeCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayResetKey, setAutoplayResetKey] = useState(0);

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

  return (
    <div className="homeCarousel">
      <div className="homeCarouselStage">
        <div className="homeCarouselTopBar">
          <a
            className="homeCarouselSearchLink"
            href="https://www.rona.ca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rechercher des pièces
          </a>
        </div>
        <div
          className="homeCarouselViewport"
          role="region"
          aria-roledescription="carousel"
          aria-label="Diapositives"
          onClick={onViewportTap}
        >
          <div className="homeCarouselStack">
            <div className={`homeCarouselSlide ${activeIndex === 0 ? 'homeCarouselSlideActive' : ''}`} aria-hidden={activeIndex !== 0}>
              <figure className="homeCarouselFigure">
                <img
                  className="homeCarouselHeroImg"
                  src="/mike.jpg"
                  alt=""
                  width={1080}
                  height={1920}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </figure>
            </div>
            <div className={`homeCarouselSlide ${activeIndex === 1 ? 'homeCarouselSlideActive' : ''}`} aria-hidden={activeIndex !== 1}>
              <div className="homeCarouselPlaceholder homeCarouselPlaceholderPlan">
                <h2 className="homeCarouselPlaceholderTitle">Plan du site</h2>
                <p className="homeCarouselPlaceholderText">Un PDF sera ajouté ici prochainement.</p>
              </div>
            </div>
            <div className={`homeCarouselSlide ${activeIndex === 2 ? 'homeCarouselSlideActive' : ''}`} aria-hidden={activeIndex !== 2}>
              <div className="homeCarouselPlaceholder homeCarouselPlaceholderPub">
                <h2 className="homeCarouselPlaceholderTitle">Publicité</h2>
                <p className="homeCarouselPlaceholderText">Exemple d’emplacement pour une annonce ou une promotion.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  );
}
