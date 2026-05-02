export default function HomePage() {
  return (
    <main className="home">
      <figure className="homeFigure">
        <img
          className="homeHero"
          src="/mike.jpg"
          alt=""
          width={1080}
          height={1920}
          loading="lazy"
          decoding="async"
        />
      </figure>
    </main>
  );
}
