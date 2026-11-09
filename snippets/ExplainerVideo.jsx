export const ExplainerVideo = ({ src, poster, title, duration, compact }) => {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);

  if (compact) {
    const open = () => {
      dialogRef.current.showModal();
      videoRef.current.play().catch(() => {});
    };
    const close = () => dialogRef.current.close();

    return (
      <figure className="yd-video-compact">
        <button
          type="button"
          className="yd-video-thumb"
          style={{ backgroundImage: `url("${poster}")` }}
          onClick={open}
          aria-label={`Play video: ${title}`}
        >
          <span className="yd-video-play" aria-hidden="true" />
          <span className="yd-video-duration">{duration}</span>
        </button>
        <figcaption className="yd-video-caption">
          <span className="yd-video-title">{title}</span>
          <span className="yd-video-meta">Captions on screen, no voiceover</span>
        </figcaption>
        <dialog
          ref={dialogRef}
          className="yd-video-dialog"
          aria-label={title}
          onClose={() => videoRef.current.pause()}
          onClick={(event) => {
            if (event.target === dialogRef.current) close();
          }}
        >
          <button
            type="button"
            className="yd-video-close"
            onClick={close}
            aria-label="Close video"
          >
            ×
          </button>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            preload="none"
            playsInline
            aria-label={title}
          />
        </dialog>
      </figure>
    );
  }

  return (
    <figure style={{ margin: "24px 0" }}>
      <video
        src={src}
        poster={poster}
        controls
        preload="none"
        playsInline
        aria-label={title}
        style={{
          width: "100%",
          aspectRatio: "16 / 9",
          display: "block",
          borderRadius: "12px",
          backgroundColor: "#16181D",
        }}
      />
      <figcaption
        style={{
          marginTop: "8px",
          fontSize: "13px",
          opacity: 0.7,
        }}
      >
        Video: {title} ({duration}, captions on screen, no voiceover)
      </figcaption>
    </figure>
  );
};
