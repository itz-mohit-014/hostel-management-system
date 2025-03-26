import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => { document.body.style.overflow = 'auto';}

  }, [isOpen])

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xl z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="sm:p-6 max-w-md w-full h-auto relative overflow-y-auto max-h-[98vh] scrollbar-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1 hover:text-primary/70 bg-primary-foreground rounded-full text-primary"
          >
            <X size={20} />
          </button>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
