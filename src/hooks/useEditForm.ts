import { useSWRConfig } from "swr";

const API_URL = "http://localhost:5000/api";

export const useEditJoke = () => {
  const mutate = useSWRConfig().mutate; // Refresh data after editing

  const editJoke = async (id: string, question: string, answer: string) => {
    const response = await fetch(`${API_URL}/joke/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });

    if (!response.ok) throw new Error("Failed to update joke");

    await mutate(`${API_URL}/joke`); // Refresh the joke data
  };

  return { editJoke };
};
