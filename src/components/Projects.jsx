import React, { useRef, useEffect, useState, useCallback } from 'react';
import parttabIcon from '../assets/icons/parttab.png?url';
import ektrackIcon from '../assets/icons/ektruck.png?url';
import serveetoIcon from '../assets/icons/serveeto.png?url';
import orbislivesIcon from '../assets/icons/orbislives.png?url';
import inorwaIcon from '../assets/icons/inorwa.png?url';
import jayasIcon from '../assets/icons/jayas.png?url';
import privcyIcon from '../assets/icons/privcy.png?url';

const CARDS_PER_PAGE = 3;

/**
 * Add new projects here – each entry renders as a card in the horizontal list.
 * Required: icon, title, desc, href, external
 */
export const PROJECTS = [
  {
    icon: parttabIcon,
    fallbackIcon: '📋',
    title: 'PartTab',
    desc: 'PartTab is a job and task management app for tracking daily work efficiently.',
    href: 'https://play.google.com/store/apps/details?id=com.parttab.marketplace',
    external: true,
  },
  {
    icon: ektrackIcon,
    fallbackIcon: '🚗',
    title: 'EkTrack',
    desc: 'Tracks vehicles/fleets and gives real-time updates. Published on Play Store.',
    href: 'https://play.google.com/store/apps/details?id=com.ek.ektrack',
    external: true,
  },
  {
    icon: serveetoIcon,
    fallbackIcon: '🛒',
    title: 'Serveeto',
    desc: 'Online marketplace for verified local professional services.',
    href: '#',
    external: false,
  },
  {
    icon: orbislivesIcon,
    fallbackIcon: '🏥',
    title: 'Orbislives',
    desc: 'Healthcare management app with real-time booking, virtual consultations, and secure data handling.',
    href: '#',
    external: false,
  },
  {
    icon: inorwaIcon,
    fallbackIcon: '📝',
    title: 'Inorwa',
    desc: 'Inorwa is a smart to-do and task manager app for organizing tasks, reminders, and team collaboration with an intuitive interface and productivity tools.',
    href: '#',
    external: false,
  },
  {
    icon: jayasIcon,
    fallbackIcon: '📚',
    title: "Jaya's Academy",
    desc: "Jaya's Academy offers personalized online tutoring in math, science, English, and test prep.",
    href: '#',
    external: false,
  },
  {
    icon: privcyIcon,
    fallbackIcon: '🔒',
    title: 'Privcy.ai',
    desc: 'Privcy.ai secures AI use with data protection for companies.',
    href: '#',
    external: false,
  },
];

function ProjectCard({ project, index }) {
  const [imgError, setImgError] = React.useState(false);
  const isImageIcon =
    typeof project.icon === 'string' &&
    (project.icon.match(/\.(png|jpg|jpeg|svg|webp)$/i) || project.icon.startsWith('/') || project.icon.startsWith('data:'));

  return (
    <article className="project-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="project-card-inner">
        <div className="project-header">
          {isImageIcon && !imgError ? (
            <img
              src={project.icon}
              alt=""
              className="project-icon project-icon--img"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="project-icon">{project.fallbackIcon ?? project.icon}</span>
          )}
          <h3>{project.title}</h3>
        </div>
        <p className="project-desc">{project.desc}</p>
        <div className="project-card-footer">
          <a
            href={project.href}
            className="project-link"
            target={project.external ? '_blank' : undefined}
            rel={project.external ? 'noopener noreferrer' : undefined}
          >
            {project.external ? 'View on Play Store' : 'Learn more'}
            <span className="project-link-arrow">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ onObserve }) {
  const ref = useRef(null);
  const listRef = useRef(null);
  const wrapRef = useRef(null);
  const totalPages = Math.ceil(PROJECTS.length / CARDS_PER_PAGE);
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

  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    const handleWheel = (e) => {
      const { scrollLeft, scrollWidth, clientWidth } = list;
      const canScrollLeft = scrollLeft > 2;
      const canScrollRight = scrollLeft < scrollWidth - clientWidth - 2;

      if (e.deltaY !== 0) {
        if (e.deltaY > 0 && canScrollRight) {
          e.preventDefault();
          list.scrollLeft += e.deltaY;
        } else if (e.deltaY < 0 && canScrollLeft) {
          e.preventDefault();
          list.scrollLeft += e.deltaY;
        }
      }
    };

    wrap.addEventListener('wheel', handleWheel, { passive: false });
    return () => wrap.removeEventListener('wheel', handleWheel);
  }, []);

  const goToPage = (page) => {
    const list = listRef.current;
    if (!list) return;
    const pageWidth = list.clientWidth;
    list.scrollTo({ left: (page - 1) * pageWidth, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <section id="projects" className="section projects">
      <div className="container container--projects" ref={ref}>
        <h2 className="section-title animate-on-scroll">Featured Projects</h2>
        <div className="projects-list-wrap animate-on-scroll" ref={wrapRef}>
          <div className="projects-list" ref={listRef}>
            {PROJECTS.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </div>
        <div className="projects-nav animate-on-scroll">
          <button
            type="button"
            className="projects-arrow projects-arrow--left"
            aria-label="Previous projects"
            onClick={() => goToPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          >
            ←
          </button>
          <span className="projects-page-count">
            {currentPage} / {totalPages}
          </span>
          <button
            type="button"
            className="projects-arrow projects-arrow--right"
            aria-label="Next projects"
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
