import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { useState, useCallback, useRef } from "react";

interface UploadBoxProps {
  onResult: (original: string, depth: string) => void;
}

const UploadBox = ({ onResult }: UploadBoxProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleGenerate = () => {
    if (!preview) return;
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      onResult(preview, preview); // In production, this would be the actual depth map
    }, 3000);
  };

  return (
    <section id="upload" className="relative py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Upload Your <span className="gradient-text">Image</span>
          </h2>
          <p className="text-muted-foreground">
            Drop any RGB image and watch the AI predict its depth map
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl"
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`glass relative cursor-pointer overflow-hidden p-8 transition-all ${
              isDragging ? "border-accent glow-md" : "hover:border-muted-foreground/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />

            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center gap-6"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-80 rounded-xl object-contain"
                    />
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-foreground/10" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click to change image
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-12"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                    <Upload className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">
                      Drag & drop your image here
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      or click to browse • PNG, JPG, WEBP
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGenerate();
                }}
                disabled={isProcessing}
                className="group relative flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent to-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Depth Map
                  </>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UploadBox;
