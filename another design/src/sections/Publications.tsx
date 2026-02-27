import { useRef, useEffect, useState } from 'react';
import { ExternalLink, FileText, Code } from 'lucide-react';

const publications = [
  {
    title: 'Enhancing Implicit Neural Representations via Symmetric Power Transformation',
    authors: 'Weixiang Zhang, et al.',
    venue: 'AAAI',
    year: '2025',
    level: 'CCF-A',
    abstract: 'We propose "Symmetric Power Transformation" method that reconstructs data distribution through nonlinear invertible transformation, achieving efficient and lossless implicit neural representation training.',
    links: {
      project: 'https://weixiang-zhang.github.io/proj-symtrans/',
      paper: 'https://ojs.aaai.org/index.php/AAAI/article/view/33102',
      arxiv: 'https://arxiv.org/abs/2412.09213',
      code: 'https://github.com/zwx-open/Symmetric-Power-Transformation-INR',
    },
    thumbnail: true,
  },
  {
    title: 'EVOS: Efficient Implicit Neural Training via EVOlutionary Selector',
    authors: 'Weixiang Zhang, et al.',
    venue: 'CVPR',
    year: '2025',
    level: 'CCF-A',
    abstract: 'A dynamic sample selection framework that treats sample coordinates as evolutionary individuals, significantly reducing INR training computation and overcoming spectral bias.',
    links: {
      project: 'https://weixiang-zhang.github.io/proj-evos/',
      paper: 'https://openaccess.thecvf.com/content/CVPR2025/papers/Zhang_EVOS_Efficient_Implicit_Neural_Training_via_EVOlutionary_Selector_CVPR_2025_paper.pdf',
      arxiv: 'https://arxiv.org/abs/2412.10153',
      code: 'https://github.com/zwx-open/EVOS-INR',
    },
    thumbnail: true,
  },
  {
    title: 'SizeGS: Size-aware Compression of 3D Gaussian Splatting via Mixed Integer Programming',
    authors: 'Shuzhao Xie, et al.',
    venue: 'ACM MM',
    year: '2025',
    level: 'CCF-A',
    abstract: 'A size-aware compression framework based on mixed integer programming that models 3DGS compression as MINLP, achieving SOTA offline compression performance.',
    links: {
      project: 'https://shuzhaoxie.github.io/sizegs/',
      paper: 'https://shuzhaoxie.github.io/data/25-mm-sizegs.pdf',
      arxiv: 'https://arxiv.org/abs/2412.05808',
      code: 'https://github.com/mmlab-sigs/SizeGS',
    },
    thumbnail: true,
  },
  {
    title: 'COSMIC: Clique-Oriented Semantic Multi-space Integration for Robust CLIP Test-Time Adaptation',
    authors: 'Haifeng Huang, et al.',
    venue: 'CVPR',
    year: '2025',
    level: 'CCF-A',
    abstract: 'Enhancing vision-language model adaptation at test time through multi-granularity, cross-modal semantic caching and graph-based query mechanisms.',
    links: {
      project: 'https://hf618.github.io/COSMIC_Project',
      paper: 'https://openaccess.thecvf.com/content/CVPR2025/html/Huang_COSMIC_Clique-Oriented_Semantic_Multi-space_Integration_for_Robust_CLIP_Test-Time_Adaptation_CVPR_2025_paper.html',
      arxiv: 'https://arxiv.org/abs/2509.23808',
      code: 'https://github.com/hf618/COSMIC',
    },
    thumbnail: true,
  },
  {
    title: 'Discover Your Neighbors: Advanced Stable Test-Time Adaptation in Dynamic World',
    authors: 'Peanut-255, et al.',
    venue: 'NeurIPS',
    year: '2025',
    level: 'CCF-A',
    abstract: 'The DYN framework achieves dynamic test-time adaptation through layer-wise instance statistic clustering and cluster-aware batch normalization.',
    links: {
      paper: 'https://openreview.net/pdf?id=bLXfEMe1Dk',
      code: 'https://github.com/Peanut-255/FIND',
    },
    thumbnail: true,
  },
];

export function Publications() {
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
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="publications" ref={sectionRef} className="section bg-secondary/30">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <h2 className="section-title">Selected Publications</h2>
        <p className="section-subtitle">代表性成果</p>

        {/* Publications List */}
        <div className="space-y-0">
          {publications.map((pub, index) => (
            <div
              key={index}
              className={`pub-item transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-5">
                {/* Thumbnail */}
                <div className="w-32 md:w-40 shrink-0">
                  <div className="paper-thumbnail">
                    <span className="text-xs text-muted-foreground">Paper Figure</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="text-base font-semibold text-foreground mb-1 leading-snug">
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-sm text-muted-foreground mb-2">
                    {pub.authors}
                  </p>

                  {/* Venue */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={pub.level === 'CCF-A' ? 'venue-badge-ccfa' : 'venue-badge-ccfb'}>
                      {pub.level}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {pub.venue} {pub.year}
                    </span>
                  </div>

                  {/* Abstract */}
                  <p className="text-sm text-foreground/70 leading-relaxed mb-3 line-clamp-2">
                    {pub.abstract}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    {pub.links.project && (
                      <a
                        href={pub.links.project}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Project
                      </a>
                    )}
                    {pub.links.paper && (
                      <a
                        href={pub.links.paper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Paper
                      </a>
                    )}
                    {pub.links.arxiv && (
                      <a
                        href={pub.links.arxiv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        arXiv
                      </a>
                    )}
                    {pub.links.code && (
                      <a
                        href={pub.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Code className="w-3.5 h-3.5" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
