import React, { useRef, useEffect } from 'react';

export default function About({ onObserve }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!onObserve || !ref.current) return;
    const el = ref.current;
    const observer = onObserve();
    const nodes = el.querySelectorAll('.animate-on-scroll');
    nodes.forEach((node) => observer.observe(node));
    return () => nodes.forEach((node) => observer.unobserve(node));
  }, [onObserve]);

  return (
    <section id="about" className="section about">
      <div className="container" ref={ref}>
        <h2 className="section-title animate-on-scroll">About Me</h2>
        <div className="about-grid animate-on-scroll">
          <div className="about-content">
            <p className="about-text">
              I'm an experienced Android Developer with over <strong>3+ years</strong> of experience
              creating reliable, user-centric mobile applications. I specialize in{' '}
              <strong>Kotlin</strong>, <strong>MVVM architecture</strong>, and seamless API
              integration, with a strong focus on performance, scalability, and intuitive UI/UX design.
            </p>
            <p className="about-text">
              I'm passionate about building clean, maintainable code and delivering smooth user
              experiences using modern Android development practices and Material Design, while
              continuously learning and adapting to new technologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
