import { useRef, useEffect, useState } from 'react';

const researchAreas = [
  {
    title: 'Efficient Embodied Data Preparation',
    titleCn: '高效具身数据制备',
    description: 'Optimizing data collection and annotation pipelines, developing automated data generation and augmentation techniques to provide high-quality training data for embodied agents.',
    topics: ['Automated Data Annotation', 'Synthetic Data Generation', 'Data Augmentation', 'Multimodal Data Alignment'],
  },
  {
    title: 'Multimodal Perception & World Models',
    titleCn: '多模态感知与世界模型',
    description: 'Fusing vision, language, and action to build multimodal perception systems that understand the physical world and construct accurate world models.',
    topics: ['Vision-Language-Action Fusion', '3D Scene Understanding', 'World Model Construction', 'Semantic Mapping'],
  },
  {
    title: 'Spatiotemporal Decision Making',
    titleCn: '时空决策',
    description: 'Planning and decision-making in complex dynamic environments, enabling autonomous navigation and task execution capabilities for intelligent agents.',
    topics: ['Robot Policy Learning', 'Long-horizon Task Planning', 'Sim-to-Real Transfer', 'Real-time Path Planning'],
  },
  {
    title: 'Agent Continuous Learning',
    titleCn: '智能体持续学习',
    description: 'Enabling agents with lifelong learning and adaptation capabilities, allowing continuous performance improvement in ever-changing environments.',
    topics: ['Test-time Adaptation', 'Continual Learning', 'LLM Generalization', 'Knowledge Transfer'],
  },
];

export function ResearchAreas() {
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
    <section id="research" ref={sectionRef} className="section bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="section-title">Research</h2>
        <p className="section-subtitle">研究方向</p>

        {/* Research Areas */}
        <div className="space-y-8">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {area.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {area.titleCn}
              </p>
              <p className="text-foreground/80 leading-relaxed mb-4">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.topics.map((topic, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 bg-white border border-border rounded text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
