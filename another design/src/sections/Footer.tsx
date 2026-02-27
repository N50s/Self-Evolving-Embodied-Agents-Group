import { Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-foreground text-background py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Info */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-3">
              Self-Evolving Embodied Agents Group
            </h3>
            <p className="text-sm text-background/70 mb-4 max-w-md leading-relaxed">
              A research collective at the forefront of artificial intelligence, 
              dedicated to creating intelligent agents that perceive, reason, and act in the real world.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/60">
              <MapPin className="w-4 h-4" />
              <span>Tsinghua University Shenzhen International Graduate School</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3 text-background/80">
              Contact
            </h4>
            <a
              href="mailto:wangzhi@sz.tsinghua.edu.cn"
              className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
            >
              <Mail className="w-4 h-4" />
              wangzhi@sz.tsinghua.edu.cn
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-6">
          <p className="text-xs text-background/50">
            &copy; {currentYear} Self-Evolving Embodied Agents Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
