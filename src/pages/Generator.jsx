import React, { useEffect, useState } from "react";
import { VscGear } from "react-icons/vsc";
import { PAGES } from "../utils/pages";
import { loadData } from "../utils/localStorage";
import { Configuration, OpenAIApi } from "openai";

function Generator({ setPage, resume, openAIKey }) {
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getJobDescription = async () => {
      const description = await loadData("jobDescription");
      console.log("job description", description);
      setJobDescription(description);
    };
    getJobDescription();
  }, []);

  const generateCoverLetter = async () => {
    setIsLoading(true);
    try {
      const configuration = new Configuration({
        apiKey: openAIKey,
      });
      const openai = new OpenAIApi(configuration);

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Generate a cover letter based on the following resume and job description:\n\nRESUME:\n${resume}\n\nJob Description:\n${jobDescription}`,
          },
        ],
      });
      setCoverLetter(chatCompletion.data.choices[0].message.content);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button
          onClick={generateCoverLetter}
          className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500"
        >
          {isLoading ? "Generating" : "Generate"}
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
          rows={5}
          className="w-full"
          placeholder="Generated cover letter"
          value={coverLetter}
        />
      </div>
    </div>
  );
}

export default Generator;
