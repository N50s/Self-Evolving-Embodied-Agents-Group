import { useRef, useEffect, useState } from 'react';

const newsItems = [
  {
    date: 'Nov 2025',
    content: 'Our paper MoETTA was accepted by AAAI 2026 (CCF-A).',
    highlight: true,
  },
  {
    date: 'Sep 2025',
    content: 'Our paper FIND was accepted by NeurIPS 2025 (CCF-A).',
    highlight: true,
  },
  {
    date: 'Mar 2025',
    content: 'Our paper DATTA was accepted by ICME 2025 (CCF-B).',
    highlight: false,
  },
  {
    date: 'Mar 2025',
    content: 'Our paper LLM4Band was accepted by NOSSDAV 2025 (CCF-B).',
    highlight: false,
  },
  {
    date: 'Feb 2025',
    content: 'Our paper COSMIC was accepted by CVPR 2025 (CCF-A).',
    highlight: true,
  },
];

export function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="news" ref={sectionRef} className="section">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="section-title">News</h2>
        <p className="section-subtitle">近期动态</p>

        {/* News List */}
        <div className="space-y-0">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`news-item flex gap-6 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="text-sm text-muted-foreground w-20 shrink-0 font-medium">
                {item.date}
              </span>
              <p className={`text-sm ${item.highlight ? 'text-foreground font-medium' : 'text-foreground/80'}`}>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
