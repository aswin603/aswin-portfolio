import React, { useState, useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;
const HERO_VIDEO_MOBILE = `${BASE}phoneanimmob.mp4`;
const HERO_VIDEO_DESKTOP = `${BASE}phoneanimpc.mp4`;
const MOBILE_BREAKPOINT = 768;

export default function Hero() {
  const [videoSrc, setVideoSrc] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT
      ? HERO_VIDEO_MOBILE
      : HERO_VIDEO_DESKTOP
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const updateSrc = () => {
      const next = mql.matches ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP;
      setVideoSrc((prev) => (prev !== next ? next : prev));
    };
    mql.addEventListener('change', updateSrc);
    updateSrc();
    return () => mql.removeEventListener('change', updateSrc);
  }, []);

  return (
    <section id="hero" className="hero">
      <video
        className="hero-bg-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        key={videoSrc}
        src={videoSrc}
      />
      <h1 className="hero-title animate-slide-up">
        Hey, I'm <span className="hero-name">Aswin K B</span>
      </h1>
      <p className="hero-role animate-slide-up delay-1">Android Developer</p>
      <p className="hero-tagline animate-slide-up delay-2">
        Building high-quality, user-centric mobile apps with Kotlin, MVVM & Jetpack Compose
      </p>
      <div className="hero-cta animate-slide-up delay-3">
        <a href="#projects" className="btn btn-primary">
          View Projects
        </a>
        <a href="#contact" className="btn btn-outline">
          Get in Touch
        </a>
      </div>
    </section>
  );
}
