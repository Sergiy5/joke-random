import { useSWRConfig } from "swr";
import axios from "axios";
import { IJoke } from "./useJokes";

// const API_URL = "http://localhost:5000/api";
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const useEditJoke = () => {
  const { mutate } = useSWRConfig(); // ✅ Fix: useSWRConfig correctly


  const editJoke = async (id: string, question: string, answer: string) => {
    // Send updated joke to backend
    await axios.put(`${API_URL}/joke/${id}`, {
      question,
      answer,
    });

    // Mutate cache directly using new joke data
    mutate(
      `${API_URL}/fetch-joke`,
      async (prevJoke: IJoke | undefined) => {
        if (prevJoke && prevJoke.id === id) {
          return {
            ...prevJoke,
            question, // Update question
            answer, // Update answer
          };
        }
        return prevJoke; // Return previous joke if not the one being edited
      },
      false
    );
  };

  return { editJoke };
};