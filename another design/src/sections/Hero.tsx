export function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Institution */}
        <p className="text-sm text-muted-foreground mb-4">
          Tsinghua University Shenzhen International Graduate School
        </p>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 leading-tight">
          Self-Evolving Embodied Agents Group
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8">
          自进化具身智能体小组
        </p>

        {/* Description */}
        <div className="max-w-3xl">
          <p className="text-foreground leading-relaxed mb-4">
            Our vision is to create intelligent agents that can perceive, reason, and act 
            in complex, real-world environments—agents that continuously learn and adapt, 
            seamlessly bridging the gap between the digital and physical worlds.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            我们的愿景是创造能够在复杂的现实世界环境中感知、推理和行动的智能体——
            能够持续学习和适应，无缝连接数字与物理世界的智能体。
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap gap-6 mt-10 pt-6 border-t border-border">
          <div>
            <p className="text-2xl font-semibold text-foreground">5+</p>
            <p className="text-sm text-muted-foreground">CCF-A Papers (2025)</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">CVPR</p>
            <p className="text-sm text-muted-foreground">NeurIPS, AAAI</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-foreground">Embodied AI</p>
            <p className="text-sm text-muted-foreground">Research Focus</p>
          </div>
        </div>
      </div>
    </section>
  );
}
