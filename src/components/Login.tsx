"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

interface LoginProps {
  setIsLogedInUser: (isLogedInUser: boolean) => void;
}

export const Login: React.FC<LoginProps> = ({ setIsLogedInUser }) => {
  const [isLogining, setIsLogining] = useState(false);
  const [useName, setUseName] = useState("");

  const { user, login, logout } = useAuth();

  useEffect(() => {
    setIsLogedInUser(!!user);
  }, [user, setIsLogedInUser]);

  return (
    <div className="p-4 w-full">
      {user ? (
        <div className="w-full flex items-center justify-between">
          <p>Hi, {user}!</p>
          <button onClick={logout} className="text-red-500 hover:text-red-400 ">
            Logout
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            Please&nbsp;
            <button
              type="button"
              onClick={() => setIsLogining(true)}
              className="text-blue-500 hover:text-blue-400"
            >
              log in
            </button>
            &nbsp;to be able to vote
          </div>
          <div
            className={`flex items-center justify-center transition-all duration-500 easy-in-out overflow-hidden ${
              isLogining
                ? "h-10 opacity-100"
                : "h-0 opacity-0 pointer-events-none"
            }`}
          >
            <>
              <input
                type="text"
                name="username"
                onChange={(e) => setUseName(e.target.value)}
                placeholder="Enter your username"
                className={`bg-gray-200 h-10 border-none outline-none rounded-lg p-4 md:w-full `}
              />
              <button
                type="submit"
                onClick={() => {
                  login(useName);
                  setIsLogining(false);
                }}
                className="bg-green-500 text-white px-4 py-2 w-24 rounded"
              >
                Log in
              </button>
            </>
          </div>
        </>
      )}
    </div>
  );
};
