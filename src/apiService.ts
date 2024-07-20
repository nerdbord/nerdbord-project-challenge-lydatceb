import axios from "axios";
import config from "./config";

const baseURL = "https://training.nerdbord.io/api/v1/openai/chat/completions"

export const fetchChatCompletion = async (
    prompt: string ) => {
        try {
            const response = await axios.post(
            baseURL,
            {
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt }
            ],
            },
            {
            headers: {
                "Content-Type": "application/json",
                Authorization:  `Bearer ${config.API_KEY}`,
                },
              }
            );

            if (response.status !== 200) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
          
              const responseData = response.data;
  
  
              if (responseData && responseData.choices && responseData.choices.length > 0) {
              
                return(responseData.choices[0].message.content);
              } else {
                console.error("No choices found in response.");
              }
            } catch (error) {
              console.error("Error calling GPT API:", error);
            }
          return null;
          };