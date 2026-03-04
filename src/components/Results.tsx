import { motion } from "framer-motion";
import { Download, BarChart3 } from "lucide-react";

interface ResultsProps {
  original: string;
  depthMap: string;
}

const metrics = [
  { label: "RMSE", value: "0.382", description: "Root Mean Square Error" },
  { label: "AbsRel", value: "0.108", description: "Absolute Relative Error" },
  { label: "δ < 1.25", value: "0.871", description: "Threshold Accuracy" },
];

const Results = ({ original, depthMap }: ResultsProps) => {
  return (
    <section id="results" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Depth <span className="gradient-text">Results</span>
          </h2>
          <p className="text-muted-foreground">
            Side-by-side comparison of original image and predicted depth map
          </p>
        </motion.div>

        {/* Side-by-side images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 grid max-w-5xl gap-6 md:grid-cols-2"
        >
          <div className="glass overflow-hidden p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Original Image
            </p>
            <div className="overflow-hidden rounded-xl">
              <img src={original} alt="Original" className="w-full rounded-xl object-cover" />
            </div>
          </div>
          <div className="glass overflow-hidden p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Predicted Depth Map
            </p>
            <div className="overflow-hidden rounded-xl">
              <img
                src={depthMap}
                alt="Depth Map"
                className="w-full rounded-xl object-cover"
                style={{ filter: "grayscale(100%) contrast(1.5) brightness(0.8)" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mb-8 grid max-w-3xl gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="glass p-5 text-center"
            >
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5 text-accent" />
                <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
              </div>
              <p className="text-2xl font-bold gradient-text">{metric.value}</p>
              <p className="mt-1 text-xs text-muted-foreground/60">{metric.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Download */}
        <div className="flex justify-center">
          <a
            href={depthMap}
            download="depth-map.png"
            className="glass flex items-center gap-2 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-card/80"
          >
            <Download className="h-4 w-4 text-accent" />
            Download Depth Map
          </a>
        </div>
      </div>
    </section>
  );
};

export default Results;
