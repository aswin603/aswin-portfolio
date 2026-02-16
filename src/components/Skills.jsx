import React, { useRef, useEffect, useState, useCallback } from 'react';
import codeIcon from '../assets/icons/code.svg?url';
import compassIcon from '../assets/icons/compass.svg?url';
import backendIcon from '../assets/icons/backend.svg?url';
import uiIcon from '../assets/icons/ui.svg?url';
import databaseIcon from '../assets/icons/database.svg?url';

const SKILLS_PER_PAGE = 4;

const SKILLS = [
  { icon: codeIcon, title: 'Languages', desc: 'Kotlin, Java, Dart' },
  { icon: compassIcon, title: 'Architecture & Patterns', desc: 'MVVM, Clean Architecture' },
  { icon: uiIcon, title: 'UI / UX', desc: 'Jetpack Compose, Material Design, XML Layouts' },
  { icon: backendIcon, title: 'Backend & Services', desc: 'Firebase, FCM, REST APIs, Google Maps' },
  { icon: databaseIcon, title: 'Database', desc: 'Room, SQLite, Firebase' },
];

export default function Skills({ onObserve }) {
  const ref = useRef(null);
  const listRef = useRef(null);
  const programmaticScrollRef = useRef(false);
  const totalPages = Math.ceil(SKILLS.length / SKILLS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!onObserve || !ref.current) return;
    const el = ref.current;
    const observer = onObserve();
    const nodes = el.querySelectorAll('.animate-on-scroll');
    nodes.forEach((node) => observer.observe(node));
    return () => nodes.forEach((node) => observer.unobserve(node));
  }, [onObserve]);

  const updatePageFromScroll = useCallback(() => {
    if (programmaticScrollRef.current) return;
    const list = listRef.current;
    if (!list || totalPages <= 0) return;
    const pageWidth = list.clientWidth;
    if (pageWidth <= 0) return;
    const scrollLeft = list.scrollLeft;
    const page = Math.min(totalPages, Math.max(1, Math.round(scrollLeft / pageWidth) + 1));
    setCurrentPage(page);
  }, [totalPages]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.addEventListener('scroll', updatePageFromScroll);
    updatePageFromScroll();
    return () => list.removeEventListener('scroll', updatePageFromScroll);
  }, [updatePageFromScroll]);

  const goToPage = (page) => {
    const list = listRef.current;
    if (!list) return;
    programmaticScrollRef.current = true;
    setCurrentPage(page);
    const pageWidth = list.clientWidth;
    list.scrollTo({ left: (page - 1) * pageWidth, behavior: 'smooth' });
    setTimeout(() => {
      programmaticScrollRef.current = false;
    }, 500);
  };

  return (
    <section id="skills" className="section skills">
      <div className="container container--skills" ref={ref}>
        <h2 className="section-title animate-on-scroll">Technical Skills</h2>
        <div className="skills-list-wrap animate-on-scroll">
          <div className="skills-list" ref={listRef}>
            {SKILLS.map((skill) => (
              <div key={skill.title} className="skill-card">
                {typeof skill.icon === 'string' && (skill.icon.includes('.svg') || skill.icon.startsWith('/') || skill.icon.includes('assets') || skill.icon.startsWith('data:')) ? (
                  <img src={skill.icon} alt="" className="skill-icon skill-icon--img" />
                ) : (
                  <span className="skill-icon">{skill.icon}</span>
                )}
                <h3>{skill.title}</h3>
                <p>{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="skills-nav animate-on-scroll">
          <button
            type="button"
            className="skills-arrow skills-arrow--left"
            aria-label="Previous skills"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            ←
          </button>
          <span className="skills-page-count">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="skills-arrow skills-arrow--right"
            aria-label="Next skills"
            onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
