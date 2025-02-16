"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";

const API_URL = "http://localhost:5000/api";

// Fetcher function for SWR
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface IJoke {
  _id: string;
  question: string;
  answer: string;
  availableVotes: string[];
  votes: { label: string; value: number}[];
}

export const useJokes = () => {
const [joke, setJoke] = useState<IJoke>();

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  } = useSWR(`${API_URL}/joke`, fetcher);

useEffect(() => {
  if (data) setJoke(data);
}, [data]);

    const vote = async (emoji: string) => {
      if (!joke?._id) return;
      console.log(emoji);

    await axios.post(`${API_URL}/joke/${joke._id}`, { label: emoji });

    // Update the local state immediately before refetching from API
    mutate(
      {
        ...joke,
        votes: joke.votes.map(
          ({label, value}) => ({
            value: label === emoji ? value + 1 : value,
            label: label,
          })
         
        ),
      },
      false
    );
  };

  return { joke, isLoading, isValidating, error, vote, mutate };
};
