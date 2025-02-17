"use client";

import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { useEffect, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {setIsVisible(isOpen)}, [isOpen]);

  return (
    <div className={`relative flex items-center justify-center w-80 m-auto`}>
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="bg-yellow-100 border rounded-lg shadow-md p-4 w-80 border-yellow-600"
            key="box"
          >
            {children}
          </motion.div>
        ) : null}
      </AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={() => setIsVisible(!isVisible)}
          whileTap={{ y: 1 }}
          className="absolute top-1 right-2 text-xl rounded-1/2 px-1 hover:bg-yellow-200 transition-all duration-300"
        >
          X
        </motion.button>
      )}
    </div>
  );
};

/**
 * ==============   Styles   ================
 */

// const container: React.CSSProperties = {
//   display: "flex",
//   flexDirection: "column",
//   width: 100,
//   height: 160,
//   position: "relative",
// };

// const box: React.CSSProperties = {
//   width: 300,
//   height: 300,
//   backgroundColor: "#FFFFFF",
//   borderRadius: "10px",
// };

// const button: React.CSSProperties = {
//   backgroundColor: "#0cdcf7",
//   borderRadius: "10px",
//   padding: "10px 20px",
//   color: "#0f1115",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
// };
