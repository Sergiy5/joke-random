"use client";

import { IJoke } from "@/hooks/useJokes";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Modal } from "./Modal";

interface ListEmojiesProps {
  joke: IJoke | null;
  vote: (label: string) => void;
  isLogedInUser: boolean;
}
export const ListEmojies: React.FC<ListEmojiesProps> = ({
  joke,
  vote,
  isLogedInUser,
}) => {
  const [isUser, setIsUser] = useState(false);
  const [isClickedNotLogin, setIsClickedNotLogin] = useState(false);

  useEffect(() => {
    setIsUser(isLogedInUser);
  }, [isLogedInUser]);

  const handleClickVote = (label: string) => {
    if (isUser) vote(label);
    
    if (!isUser) {
      setIsClickedNotLogin(true);
      setTimeout(() => {
        setIsClickedNotLogin(false);
      }, 4000);
    }
  };

  return (
    <div>
      <ul className="flex justify-center gap-2 w-full sm:gap-8">
        {joke?.votes.map(
          (
            { label, value }: { label: string; value: number },
            index: number
          ) => {
            return (
              <li key={index}>
                <button
                  onClick={() => handleClickVote(label)}
                  // disabled={!isUser}
                  className="relative flex text-3xl bg-slate-200 rounded-md p-1 overflow-hidden hover:scale-110 transition-all duration-300 min-w-max"
                >
                  {label}

                  <motion.span
                    key={value} // This ensures animation runs when value changes
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className={`mr-2 transition-all duration-300 ${
                      value === 0 ? "w-0 hidden" : "w-4"
                    }`}
                  >
                    {value}
                  </motion.span>
                </button>
              </li>
            );
          }
        )}
      </ul>
      <Modal isOpen={isClickedNotLogin}>
        <p>Please log in to vote.</p>
      </Modal>
    </div>
  );
};
