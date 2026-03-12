import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, Sparkles } from "lucide-react";
import { useState, useCallback, useRef } from "react";

interface UploadBoxProps {
  onResult: (original: string, depth: string) => void;
}

const UploadBox = ({ onResult }: UploadBoxProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((selectedFile: File) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setFile(selectedFile);

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        setPreview(result);
      }
    };

    reader.readAsDataURL(selectedFile);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFile(droppedFile);
    },
    [handleFile]
  );

  const handleGenerate = async () => {
    if (!file || !preview) {
      alert("Please upload an image first");
      return;
    }

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "https://depthvision-ai-4.onrender.com/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      const depthImage = `data:image/png;base64,${data.depth_image}`;

      onResult(preview, depthImage);
    } catch (error) {
      console.error("Error generating depth map:", error);
      alert("Error generating depth map");
    }

    setIsProcessing(false);
  };

  return (
    <section id="upload" className="relative py-32">
      <div className="container mx-auto px-6">

        <div className="mx-auto max-w-2xl">

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border p-8 text-center rounded-xl"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile) handleFile(selectedFile);
              }}
            />

            <AnimatePresence mode="wait">
              {preview ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-80 mx-auto rounded-lg"
                  />

                  <p className="text-sm mt-2">
                    Click to change image
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Upload className="mx-auto h-10 w-10" />
                  <p className="mt-2">
                    Drag & drop your image here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {preview && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleGenerate();
                }}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Depth Map
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default UploadBox;
