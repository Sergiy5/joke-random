"use client";

import { motion } from "motion/react";
import { useJokes } from "@/hooks/useJokes";
import { Loader } from "./Loader";
import { EditJokeForm } from "./EditJokeForm";
import { ListEmojies } from "./ListEmojies";
import { Login } from "./Login";
import { useState } from "react";
// import {Modal} from "./Modal";


export const JokeCard = () => {
const [isLogedInUser, setIsLogedInUser] = useState(false);

  const { joke, fetchNewJoke, isLoading, error, vote, mutate } = useJokes();

  if (error)
    return (
      <p className="text-center text-lg text-red-500">Failed to load joke</p>
    );

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center justify-center p-6 max-w-lg md:min-w-[512px] h-full">
        <Login setIsLogedInUser={setIsLogedInUser} />
        <div className="flex flex-col justify-between mx-auto bg-white rounded-lg shadow-md text-center w-full p-4 md:min-h-[280px]">
          {/* Joke Content =============================== */}
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
            transition={{ duration: 0.9, delay: 3 }}
            className="mt-2 text-gray-800 text-xl"
          >
            {joke?.answer}
          </motion.p>
          <div className="mt-4 flex flex-col justify-center gap-4">
            {/* List Emojies ============================= */}
            <ListEmojies
              joke={joke}
              vote={vote}
              isLogedInUser={isLogedInUser}
            />

            <button
              onClick={fetchNewJoke}
              className="flex items-center justify-center mt-4 px-4 py-2 h-10 bg-blue-500 hover:bg-blue-600 transition-all active:scale-[99%] text-white rounded-lg"
            >
              {isLoading ? <Loader /> : "Next Joke"}
            </button>
          </div>

          {/* Edit Joke Form ============================== */}
          <EditJokeForm joke={joke} mutate={mutate} />
        </div>
      </div>
      {/* <Modal isOpen={isLogedInUser === false}>
        <p>Please log in to vote.</p>
      </Modal> */}
    </div>
  );
};
