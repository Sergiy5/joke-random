"use client";

import {motion} from "motion/react";
import { useJokes } from "@/hooks/useJokes";
import { Loader } from "./Loader";

export const JokeCard = () => {
  const { joke, isLoading, isValidating, error, vote, mutate } = useJokes();

  if (error)
    return (
      <p className="text-center text-lg text-red-500">Failed to load joke</p>
    );


  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <div className="flex flex-col justify-between max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center md:min-w-[512px] md:min-h-[280px]">
        <motion.h2
          key={joke?.question} // This ensures animation runs when value changes
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="text-2xl font-bold"
        >
          {joke?.question}
        </motion.h2>
        <motion.p
          key={joke?.answer} // This ensures animation runs when value changes
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-2 text-gray-600"
        >
          {joke?.answer}
        </motion.p>
        <div className="mt-4 flex flex-col justify-center gap-4">
          <ul className="flex justify-center gap-8">
            {joke?.votes.map(
              ({ label, value }: { label: string; value: number }, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => vote(label)}
                      className="relative flex text-3xl w-20 bg-slate-200 rounded-md p-1 overflow-hidden hover:scale-110 transition-all"
                    >
                      {label}
                      {/* <span className="flex"> */}
                      <motion.span
                        key={value} // This ensures animation runs when value changes
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.9, delay: 0.4 }}
                      >
                        {value}
                      </motion.span>
                      {/* </span> */}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
          <button
            onClick={() => mutate()}
            className="flex items-center justify-center mt-4 px-4 py-2 h-10 bg-blue-500 text-white rounded-lg"
          >
            {isLoading || (isValidating ? <Loader /> : "Next Joke")}
          </button>
        </div>
      </div>
    </div>
  );
};
