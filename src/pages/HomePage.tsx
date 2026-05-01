export default function HomePage() {
  return (
    <main className="home">
      <header className="home__header">
        <h1 className="home__title">Home</h1>
        <p className="home__subtitle">Portrait hero (1080×1920 px)</p>
      </header>
      <figure className="home__figure">
        <img
          className="home__hero"
          src="/hero-1080x1920.png"
          alt=""
          width={1080}
          height={1920}
          loading="lazy"
          decoding="async"
        />
        <figcaption className="home__caption">Background art placeholder</figcaption>
      </figure>
    </main>
  );
}
