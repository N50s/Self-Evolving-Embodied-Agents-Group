import { useRef, useEffect, useState } from 'react';
import { Mail, Globe } from 'lucide-react';

const teamMembers = [
  {
    name: 'Zhi Wang',
    nameCn: '王智',
    title: 'Associate Professor',
    affiliation: 'Tsinghua University Shenzhen International Graduate School',
    email: 'wangzhi@sz.tsinghua.edu.cn',
    website: 'https://www.mmlab.top/',
    role: 'Principal Investigator',
  },
  {
    name: 'Jingyan Jiang',
    nameCn: '姜婧妍',
    title: 'Research Assistant',
    affiliation: 'Shenzhen Technology University',
    email: 'jiangjingyan@sztu.edu.cn',
    role: 'Member',
  },
];

export function Team() {
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
    <section id="team" ref={sectionRef} className="section">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="section-title">Team</h2>
        <p className="section-subtitle">团队</p>

        {/* Team Description */}
        <p className="text-foreground/80 leading-relaxed mb-8 max-w-3xl">
          Our group is led by Professor Zhi Wang from Tsinghua University Shenzhen International Graduate School. 
          We are a dynamic research collective at the forefront of artificial intelligence.
        </p>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`p-5 border border-border rounded bg-white transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              {/* Name */}
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {member.nameCn}
              </p>

              {/* Info */}
              <p className="text-sm text-foreground mb-1">{member.title}</p>
              <p className="text-sm text-muted-foreground mb-4">{member.affiliation}</p>

              {/* Contact */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  {member.email}
                </a>
                {member.website && (
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
