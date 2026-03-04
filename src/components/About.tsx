import { motion } from "framer-motion";
import { Car, Bot, Glasses, Box, Brain, Layers } from "lucide-react";

const applications = [
  { icon: Car, title: "Autonomous Driving", description: "Understand road depth for safe navigation" },
  { icon: Bot, title: "Robotics", description: "Enable spatial awareness in robotic systems" },
  { icon: Glasses, title: "AR / VR", description: "Create immersive augmented reality experiences" },
  { icon: Box, title: "3D Reconstruction", description: "Build 3D scenes from 2D photographs" },
];

const About = () => {
  return (
    <section id="about" className="relative py-32">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[150px]" />

      <div className="container relative z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Monocular depth estimation predicts the distance of every pixel from a single 2D image, 
            using deep learning to understand spatial relationships that humans perceive naturally.
          </p>
        </motion.div>

        {/* Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-20 max-w-3xl"
        >
          <div className="glass p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary">
                <Brain className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Model Architecture</h3>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              DepthVision uses a <span className="font-semibold text-foreground">ResNet-based encoder-decoder CNN</span>. 
              The encoder extracts hierarchical features from the input image, while the decoder reconstructs 
              a dense depth map using skip connections and up-convolution layers for precise pixel-level predictions.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["RGB Input", "ResNet Encoder", "Skip Connections", "Decoder", "Depth Map"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="glass-subtle px-3 py-1.5 text-xs font-medium text-foreground">
                    {step}
                  </div>
                  {i < 4 && (
                    <Layers className="h-3 w-3 text-accent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 text-center"
        >
          <h3 className="text-xl font-bold text-foreground">Real-World Applications</h3>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {applications.map((app, i) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="glass group p-6 text-center transition-all hover:glow-sm"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-accent/10">
                <app.icon className="h-5 w-5 text-accent" />
              </div>
              <h4 className="mb-1 text-sm font-bold text-foreground">{app.title}</h4>
              <p className="text-xs text-muted-foreground">{app.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
