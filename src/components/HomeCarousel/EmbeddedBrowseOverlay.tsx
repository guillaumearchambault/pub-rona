type EmbeddedBrowseOverlayProps = {
  url: string;
  onClose: () => void;
};

export function EmbeddedBrowseOverlay({ url, onClose }: EmbeddedBrowseOverlayProps) {
  return (
    <div
      className="homeCarouselEmbedBackdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Recherche Rona"
    >
      <div className="homeCarouselEmbedToolbar">
        <button type="button" className="homeCarouselEmbedBack" onClick={onClose}>
          Retour
        </button>
      </div>
      <iframe className="homeCarouselEmbedFrame" title="Rona" src={url} />
    </div>
  );
}
