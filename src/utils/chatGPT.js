import axios from "axios";

// Define constants
const CHATGPT_END_POINT = "https://api.openai.com/v1/chat/completions";
const CHATGPT_MODEL = "gpt-3.5-turbo";

export const postChatGPTMessage = async (message, openAIKey) => {
  // Set config for axios request
  const config = {
    headers: {
      Authorization: `Bearer ${openAIKey}`,
    },
  };
  const messages = { role: "user", content: message };
  const chatGPTData = {
    model: CHATGPT_MODEL,
    messages: [messages],
  };

  try {
    const resp = await axios.post(CHATGPT_END_POINT, chatGPTData, config);
    const data = resp.data;
    const message = data?.choices[0]?.message; // Get response message
    return message;
  } catch (error) {
    console.error("Error with ChatGPT API"); // Log error message
    console.error(error);
    return null;
  }
};
