import { Github, Linkedin, Eye } from "lucide-react";

const DepthFooter = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-primary">
            <Eye className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">
            Depth<span className="gradient-text">Vision</span>
          </span>
        </div>

        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Aayush Prasad</p>
          <p className="mt-0.5">BTech AI Project • 2026</p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-accent/10 hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground/50">
          © 2026 DepthVision. Built with AI & passion.
        </p>
      </div>
    </footer>
  );
};

export default DepthFooter;
