type PubSlideProps = {
  isActive: boolean;
};

export function PubSlide({ isActive }: PubSlideProps) {
  return (
    <div
      className={`homeCarouselSlide ${isActive ? 'homeCarouselSlideActive' : ''}`}
      aria-hidden={!isActive}
    >
      <section className="pub-slide" aria-label="Promotion sacs en vrac">
        <div className="pub-slide__main">
          <div className="pub-slide__copy">
            <p className="pub-slide__eyebrow">Jusqu’à</p>
            <p className="pub-slide__pct">15%</p>
            <p className="pub-slide__tag">DE RABAIS</p>
            <p className="pub-slide__desc">
              sacs en vrac pour
              <br />
              aménagement
              <br />
              paysager
              <br />
              sélectionnés
            </p>
          </div>
          <figure className="pub-slide__figure">
            <img
              src="/rona-bag.png"
              width={434}
              height={452}
              alt="Sac en vrac RONA+ rempli de pierre"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </figure>
        </div>
      </section>
    </div>
  );
}
