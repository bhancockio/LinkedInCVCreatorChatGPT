import React, { useEffect, useState } from "react";
import { VscGear } from "react-icons/vsc";
import { PAGES } from "../utils/pages";
import { loadData } from "../utils/localStorage";
import { postChatGPTMessage } from "../utils/chatGPT";

function Generator({ setPage, resume, openAIKey }) {
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load job description from local storage on component mount
    const getJobDescription = async () => {
      try {
        const description = await loadData("jobDescription");
        setJobDescription(description);
      } catch (error) {
        console.error("Error while fetching job description", error);
      }
    };

    getJobDescription();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoading(true);

    try {
      // Create message to send to chatGPT API
      const message = `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`;
      // Send message to chatGPT API and wait for response
      const chatGPTResponse = await postChatGPTMessage(message, openAIKey);
      // Update state with generated cover letter
      setCoverLetter(chatGPTResponse);
    } catch (error) {
      console.error(error);
    } finally {
      // Set loading state to false once the process is complete (whether it was successful or not)
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button
          disabled={isLoading}
          onClick={generateCoverLetter}
          className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500"
        >
          {isLoading ? "Generating..." : "Generate"}
        </button>
        <h2 className="text-2xl font-bold">LinkedIn Cover Letter Generator</h2>
        <button
          onClick={() => setPage(PAGES.PROFILE)}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <VscGear className="text-[150%] text-gray-500" />
        </button>
      </div>
      <div className="flex mx-5">
        <textarea
          rows={12}
          className="w-full"
          placeholder="Generated cover letter"
          value={coverLetter}
        />
      </div>
    </div>
  );
}

export default Generator;
