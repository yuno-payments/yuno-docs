export const ExplainerVideo = ({ src, poster, title, duration }) => {
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
