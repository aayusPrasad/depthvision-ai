import { motion } from "framer-motion";
import { ArrowDown, Layers, Scan, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Zap className="h-3 w-3 text-accent" />
            AI-Powered Depth Estimation
          </div>

          <h1 className="mb-4 text-5xl font-black leading-tight tracking-tight md:text-7xl lg:text-8xl">
            <span className="text-foreground">Depth</span>
            <span className="gradient-text">Vision</span>
          </h1>

          <p className="mx-auto mb-3 max-w-xl text-xl font-medium text-muted-foreground md:text-2xl">
            Seeing Depth from a Single Image
          </p>

          <p className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed text-muted-foreground/70 md:text-base">
            Upload any RGB image and our ResNet-based encoder-decoder model predicts a precise depth map — 
            transforming flat photographs into rich 3D spatial understanding.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => document.getElementById("upload")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative rounded-xl bg-gradient-to-r from-accent to-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30"
          >
            Try It Now
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent to-primary opacity-0 blur-xl transition-opacity group-hover:opacity-40" />
          </button>
          <button
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            className="glass px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-card/80"
          >
            Learn More
          </button>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-4"
        >
          {[
            { icon: Scan, label: "Single Image Input" },
            { icon: Layers, label: "Depth Map Output" },
            { icon: Zap, label: "Real-Time Processing" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="glass-subtle flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground"
            >
              <feature.icon className="h-4 w-4 text-accent" />
              {feature.label}
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
