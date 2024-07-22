/*'use client'
import React, { useState } from 'react'
import { fetchChatCompletion } from '@/apiService'

export default function Test() {
    const [inputValue, setInputValue] = useState<string>("");
    const [response, setResponse] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSend = async () => {
      setLoading(true);
      setResponse("");
       await fetchChatCompletion(
              `Odpowiedz na pytanie wg treści: ${inputValue}`,
      (response: string) => {
                setResponse(response)
                setLoading(false)
              },
              setLoading
            )
          }

    return (
        <main>
          <div className="container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Tutaj wpisuj mordo"
              style={{ color: 'black'}}
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? "Loading..." : "Send"}
            </button>
            {response && <p>Response: {response}</p>}
          </div>
        </main>
      );
    };
*/

