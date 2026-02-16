import React, { useRef, useEffect } from 'react';

const TECH_CHIPS = [
  'Kotlin', 'Java', 'XML', 'SQL', 'Android', 'Android SDK', 'Android Studio', 'Jetpack',
  'Jetpack Compose', 'Material Design', 'MVVM', 'Clean Architecture', 'Hilt', 'Dagger',
  'Coroutines', 'StateFlow', 'LiveData', 'RxJava', 'Retrofit', 'REST API', 'JSON', 'Gson',
  'Room', 'SQLite', 'DataStore', 'SharedPreferences', 'Firebase', 'Firebase Authentication',
  'Firebase Firestore', 'Firebase Realtime Database', 'Firebase Cloud Messaging (FCM)',
  'Firebase Crashlytics', 'Firebase Analytics', 'Google Maps', 'Google Play Services',
  'Play Integrity API', 'JUnit', 'UI Testing', 'LeakCanary', 'Gradle KTS', 'Version Catalog',
  'Git', 'GitHub', 'GitHub Actions', 'ProGuard', 'R8', 'Encrypted SharedPreferences',
  'Biometric API', 'MotionLayout', 'Lottie', 'Google Play Console', 'App Bundles (AAB)',
  'Internal Testing', 'Closed Testing', 'In-App Updates',
];

export default function TechStack({ onObserve }) {
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
    <section id="tech-stack" className="section tech-stack">
      <video
        className="tech-stack-bg-video"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src={`${import.meta.env.BASE_URL}chipbg.mp4`} type="video/mp4" />
      </video>
      <div className="container" ref={ref}>
        <h2 className="section-title tech-stack-title animate-on-scroll">Tech Stack</h2>
        <div className="tech-stack-grid animate-on-scroll">
          {TECH_CHIPS.map((label) => (
            <span key={label} className="tech-chip">
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
