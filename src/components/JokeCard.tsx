"use client";

import { motion } from "motion/react";
import { useJokes } from "@/hooks/useJokes";
import { Loader } from "./Loader";
import { useEditJoke } from "@/hooks/useEditForm";
import { useEffect, useState } from "react";

export const JokeCard = () => {
  const { joke, fetchNewJoke, isLoading, error, vote, mutate } = useJokes();

  const { editJoke } = useEditJoke();

  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(joke?.question);
  const [editedAnswer, setEditedAnswer] = useState(joke?.answer);

  useEffect(() => {
    setEditedQuestion(joke?.question);
    setEditedAnswer(joke?.answer)
  }, [isEditing, joke?.answer, joke?.question]);
  
  if (error)
    return (
      <p className="text-center text-lg text-red-500">Failed to load joke</p>
    );

  
  const handleEdit = async () => {
    if (!joke || !editedQuestion || !editedAnswer) return;
    await editJoke(joke.id, editedQuestion, editedAnswer);
    setIsEditing(false);
    mutate(); // Refresh joke
  };

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
          transition={{ duration: 0.9, delay: 3 }}
          className="mt-2 text-gray-600"
        >
          {joke?.answer}
        </motion.p>
        <div className="mt-4 flex flex-col justify-center gap-4">
          <ul className="flex justify-center gap-2 w-full sm:gap-8">
            {joke?.votes.map(
              ({ label, value }: { label: string; value: number }, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => vote(label)}
                      className="relative flex text-3xl bg-slate-200 rounded-md p-1 overflow-hidden hover:scale-110 transition-all duration-300 min-w-max"
                    >
                      {label}
                      {value !== 0 && (
                        <motion.span
                          key={value} // This ensures animation runs when value changes
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="mr-2"
                        >
                          {value}
                        </motion.span>
                      )}
                    </button>
                  </li>
                );
              }
            )}
          </ul>
          <button
            onClick={fetchNewJoke}
            className="flex items-center justify-center mt-4 px-4 py-2 h-10 bg-blue-500 hover:bg-blue-600 transition-all active:scale-[99%] text-white rounded-lg"
          >
            {isLoading ? <Loader /> : "Next Joke"}
          </button>
        </div>
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md text-center">
          {isEditing ? (
            <>
              <input
                className="border p-2 w-full"
                value={editedQuestion}
                // defaultValue={joke?.question}
                onChange={(e) => setEditedQuestion(e.target.value)}
              />
              <input
                className="border p-2 w-full mt-2"
                value={editedAnswer}
                // defaultValue={joke?.answer}
                onChange={(e) => setEditedAnswer(e.target.value)}
              />
              <button
                onClick={handleEdit}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Save
              </button>
            </>
          ) : (
            <>
              {/* <h2 className="text-2xl font-bold">{joke?.question}</h2>
              <p className="mt-2 text-gray-600">{joke?.answer}</p> */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
