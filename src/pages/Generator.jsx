import React from "react";
import { VscGear } from "react-icons/vsc";
import { PAGES } from "../utils/pages";

function Generator({ setPage }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between mx-5 my-3 items-center">
        <button className="border-2 border-solid border-blue-500 text-blue-500 text-lg font-bold rounded-md px-3 py-2 hover:text-white hover:bg-blue-500">
          Generate
        </button>
        <h2 className="text-2xl font-bold">LinkedIn Cover Letter Generator</h2>
        <button
          onClick={() => setPage(PAGES.PROFILE)}
          className="border mr-[1px] p-2 border-solid border-gray-600 rounded-[100%] hover:bg-gray-200 hover:border-2 hover:mr-0 transition duration-300 ease-in-out"
        >
          <VscGear className="text-[150%] text-gray-500" />
        </button>
      </div>
    </div>
  );
}

export default Generator;
