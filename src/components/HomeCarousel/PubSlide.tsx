type PubSlideProps = {
  isActive: boolean;
};

export function PubSlide({ isActive }: PubSlideProps) {
  return (
    <div
      className={`homeCarouselSlide ${isActive ? 'homeCarouselSlideActive' : ''}`}
      aria-hidden={!isActive}
    >
      <div className="homeCarouselPlaceholder homeCarouselPlaceholderPub">
        <h2 className="homeCarouselPlaceholderTitle">Publicité</h2>
        <p className="homeCarouselPlaceholderText">
          Exemple d’emplacement pour une annonce ou une promotion.
        </p>
      </div>
    </div>
  );
}
