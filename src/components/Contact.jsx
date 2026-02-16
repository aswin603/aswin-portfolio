import React, { useRef, useEffect } from 'react';

export default function Contact({ onObserve }) {
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
    <section id="contact" className="section contact">
      <div className="container" ref={ref}>
        <h2 className="section-title animate-on-scroll">Get in Touch</h2>
        <div className="contact-card animate-on-scroll">
          <p className="contact-intro">
            Open to new opportunities and collaborations. Reach out via email or phone.
          </p>
          <div className="contact-links">
            <a href="mailto:aswinkb757@gmail.com" className="contact-item">
              <span className="contact-icon">✉️</span>
              <span>aswinkb757@gmail.com</span>
            </a>
            <a href="tel:+918921181416" className="contact-item">
              <span className="contact-icon">📱</span>
              <span>+91 8921181416</span>
            </a>
            <div className="contact-item contact-location">
              <span className="contact-icon">📍</span>
              <span>Kerala, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
