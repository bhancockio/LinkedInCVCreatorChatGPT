/*global chrome*/

import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGES } from "./utils/pages";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import Loading from "./components/Loading";

function App() {
  const [page, setPage] = useState(PAGES.GENERATOR);
  const [isLoading, setIsLoading] = useState(true);
  const [openAIKey, setOpenAIKey] = useState();
  const [resume, setResume] = useState();

  useEffect(() => {
    try {
      chrome.storage.local.get(null, function (data) {
        console.log("data", data);
        if ("openAIKey" in data) {
          setOpenAIKey(data.openAIKey);
        }
        if ("resume" in data) {
          setResume(data.resume);
        }
      });
    } catch (e) {
      console.error("Error due to local state");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  switch (page) {
    case PAGES.GENERATOR:
      return <Generator setPage={setPage} />;

    case PAGES.PROFILE:
      return (
        <Profile
          setPage={setPage}
          setOpenAIKey={setOpenAIKey}
          setResume={setResume}
          resume={resume}
          openAIKey={openAIKey}
        />
      );

    default:
      return <Generator setPage={setPage} />;
  }
}

export default App;
