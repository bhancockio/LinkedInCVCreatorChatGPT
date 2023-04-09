import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { PAGES } from "./utils/pages";
import Generator from "./pages/Generator";
import Profile from "./pages/Profile";
import { loadData } from "./utils/localStorage";

function App() {
  // State management
  const [page, setPage] = useState(PAGES.GENERATOR);
  const [openAIKey, setOpenAIKey] = useState();
  const [resume, setResume] = useState();

  // Load data from local storage on component mount
  useEffect(() => {
    const fetchLocalData = async () => {
      const localResume = await loadData("resume");
      const localOpenAIKey = await loadData("openAIKey");

      setResume(localResume);
      setOpenAIKey(localOpenAIKey);
    };

    fetchLocalData();
  }, []);

  // Render components based on the current page
  switch (page) {
    case PAGES.GENERATOR:
      return (
        <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />
      );

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
      return (
        <Generator setPage={setPage} resume={resume} openAIKey={openAIKey} />
      );
  }
}

export default App;
