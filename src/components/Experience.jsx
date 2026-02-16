import React, { useRef, useEffect } from 'react';

const TIMELINE_ITEMS = [
  {
    isNow: true,
    year: 'Mar 2022 – May 2024',
    title: 'Android Developer',
    subtitle: 'Freelancer',
    nowLabel: 'NOW',
    desc: "Continuously exploring the latest in Android & mobile development, crafting scalable apps with Kotlin and Clean Architecture, and pushing the boundaries of what's possible in user-centric software. Open to new projects and collaborations.",
  },
  {
    isNow: false,
    year: 'Mar 2022 – May 2024',
    title: 'Android Developer',
    company: 'Rayblaze Globals, Trivandrum',
    bullets: [
      'Designed features with Kotlin & MVVM, increasing code scalability by 40%.',
      'Built UIs with Jetpack Compose & Material Design, improving engagement by 25%.',
      'Optimized streaming (25% less buffer), reduced crashes by 35%, improved load times by 30%.',
      'Implemented ProGuard for security and code obfuscation.',
    ],
  },
  {
    isNow: false,
    year: 'Jan 2022 – Mar 2022',
    title: 'Android Developer (Intern)',
    company: 'AVES Imagiobox, Kollam',
    bullets: [
      'Developed Android apps with Kotlin/Java; push notifications, auth, real-time chat with Firebase.',
      'Debugged with Logcat & Android Studio Profiler; documented code and APIs.',
    ],
  },
  {
    isNow: false,
    year: 'Jul 2021 – Dec 2021',
    title: 'Android Developer',
    company: 'Freelancer',
    bullets: [
      'Built client-specific Android apps in Java with XML layouts and Android design principles.',
    ],
  },
];

export default function Experience({ onObserve, timelineFillRef, experienceRef }) {
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
    <section id="experience" className="section experience" ref={experienceRef}>
      <div className="container container--wide" ref={ref}>
        <h2 className="section-title experience-title animate-on-scroll">
          My career & experience
        </h2>
        <div className="timeline-wrap animate-on-scroll">
          <div className="timeline-track" aria-hidden="true">
            <div
              className="timeline-line-fill"
              ref={timelineFillRef}
              style={{ height: '0%' }}
              aria-hidden="true"
            />
          </div>
          <div className="timeline">
            {TIMELINE_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`timeline-item${item.isNow ? ' timeline-item--now' : ''}`}
              >
                <div
                  className={`timeline-marker${item.isNow ? ' timeline-marker--glow' : ''}`}
                  aria-hidden="true"
                />
                <div className="timeline-left">
                  <span className="timeline-year">{item.year}</span>
                  {item.isNow ? (
                    <>
                      <h3 className="timeline-now-title">{item.title}</h3>
                      <p className="timeline-now-subtitle">{item.subtitle}</p>
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      <p className="timeline-company">{item.company}</p>
                    </>
                  )}
                </div>
                <div className="timeline-right">
                  {item.isNow ? (
                    <>
                      <span className="timeline-now-label">{item.nowLabel}</span>
                      <p className="timeline-now-desc">{item.desc}</p>
                    </>
                  ) : (
                    <ul>
                      {item.bullets.map((bullet, j) => (
                        <li key={j}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
