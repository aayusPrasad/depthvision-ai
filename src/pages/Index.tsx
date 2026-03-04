import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UploadBox from "@/components/UploadBox";
import Results from "@/components/Results";
import About from "@/components/About";
import DepthFooter from "@/components/DepthFooter";

const Index = () => {
  const [result, setResult] = useState<{ original: string; depth: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <UploadBox
        onResult={(original, depth) => {
          setResult({ original, depth });
          setTimeout(() => {
            document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />
      {result && <Results original={result.original} depthMap={result.depth} />}
      <About />
      <DepthFooter />
    </div>
  );
};

export default Index;
