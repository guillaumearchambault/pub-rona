type PlanSlideProps = {
  isActive: boolean;
};

export function PlanSlide({ isActive }: PlanSlideProps) {
  return (
    <div
      className={`homeCarouselSlide ${isActive ? 'homeCarouselSlideActive' : ''}`}
      aria-hidden={!isActive}
    >
      <div className="homeCarouselPlaceholder homeCarouselPlaceholderPlan">
        <h2 className="homeCarouselPlaceholderTitle">Plan du site</h2>
        <p className="homeCarouselPlaceholderText">Un PDF sera ajouté ici prochainement.</p>
      </div>
    </div>
  );
}
