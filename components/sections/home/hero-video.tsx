interface HeroVideoProps {
  src: string;
}

/**
 * HeroVideo
 * Looping brand video for the homepage hero. No overlay content.
 *
 * - Large landscape screens: fills the viewport under the sticky navbar (70px).
 * - Everything else (tablet, phone, portrait): natural 16:9 so the widescreen
 *   video is never cropped down to a narrow center slice.
 */
export default function HeroVideo({ src }: HeroVideoProps) {
  return (
    <div className="relative w-full aspect-video lg:landscape:aspect-auto lg:landscape:h-[calc(100svh-70px)] lg:landscape:min-h-[50vw] overflow-hidden bg-deep-blue">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}
