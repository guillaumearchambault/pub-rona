import type { MouseEvent } from 'react';

type CarouselTopBarProps = {
  searchUrl: string;
  onOpenSearch: (e: MouseEvent<HTMLAnchorElement>) => void;
};

export function CarouselTopBar({ searchUrl, onOpenSearch }: CarouselTopBarProps) {
  return (
    <div className="homeCarouselTopBar">
      <a className="homeCarouselSearchLink" href={searchUrl} onClick={onOpenSearch}>
        Rechercher des pièces
      </a>
    </div>
  );
}
