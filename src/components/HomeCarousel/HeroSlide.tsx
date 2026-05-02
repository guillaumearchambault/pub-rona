type HeroSlideProps = {
  isActive: boolean;
};

export function HeroSlide({ isActive }: HeroSlideProps) {
  return (
    <div
      className={`homeCarouselSlide ${isActive ? 'homeCarouselSlideActive' : ''}`}
      aria-hidden={!isActive}
    >
      <figure className="homeCarouselFigure">
        <img
          className="homeCarouselHeroImg"
          src="/mike.jpg"
          width={1080}
          height={1920}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </figure>
    </div>
  );
}
