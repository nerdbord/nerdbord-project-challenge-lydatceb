'use client'
import React, { useState } from 'react'
import { fetchChatCompletion } from '@/apiService'

export default function Test() {
    const [inputValue, setInputValue] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSend = () => {
        setResponse(""); // Clear previous response
        fetchChatCompletion(
          inputValue,
          (response: string) => {
            console.log("API Response:", response); // Log the response
            setResponse(response);
          },
          (error: string) => {
            console.error("API Error:", error); // Log the error
            setResponse(error);
          }
        );
      };

    return (
        <main>
          <div className="container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Tutaj wpisuj mordo"
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Loading..." : "Send"}
            </button>
            {response && <p>Response: {response}</p>}
          </div>
        </main>
      );
    };


