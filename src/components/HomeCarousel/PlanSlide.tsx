type PlanSlideProps = {
  isActive: boolean;
};

export function PlanSlide({ isActive }: PlanSlideProps) {
  return (
    <div
      className={`homeCarouselSlide ${isActive ? 'homeCarouselSlideActive' : ''}`}
      aria-hidden={!isActive}
    >
      <figure className="homeCarouselFigure">
        <img
          className="homeCarouselHeroImg"
          src="/siteplan.jpg"
          alt="Plan du magasin RONA+ Mascouche : rayons, entrées et code QR pour localiser les produits."
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </figure>
    </div>
  );
}
