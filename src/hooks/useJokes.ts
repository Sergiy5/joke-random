"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const API_URL = "http://localhost:5000/api";

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export interface IJoke {
  id: string;
  question: string;
  answer: string;
  availableVotes: string[];
  votes: { label: string; value: number }[];
}

export const useJokes = () => {
  const { data, error, mutate } = useSWR<IJoke>(
    `${API_URL}/joke`, // Change endpoint to fetch a joke
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  const [joke, setJoke] = useState<IJoke | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (data) setJoke(data);
  }, [data]);

  /**
   * Fetch a new joke from the backend
   */
  const fetchNewJoke = async () => {
    setIsLoading(true);
    try {
      const { data: newJoke } = await axios.get(`${API_URL}/fetch-joke`);
      mutate(newJoke, false); // Optimistic update
    } catch (error) {
      console.error("Failed to fetch a new joke:", error);
    }finally{
      setIsLoading(false);
    }
  };

  /**
   * Submit a vote for the current joke
   */
  const vote = async (emoji: string) => {
    if (!joke?.id) return;

    try {
      await axios.post(`${API_URL}/joke/${joke.id}`, { label: emoji });

      // Update the local state immediately before refetching from API
      mutate(
        {
          ...joke,
          votes: joke.votes.map(({ label, value }) => ({
            value: label === emoji ? value + 1 : value,
            label: label,
          })),
        },
        false
      );
    } catch (error) {
      console.error("Voting failed:", error);
    }
  };

  return { joke, isLoading, error, vote, fetchNewJoke, mutate };
};