export const saveDataLocally = (data, setState) => {
  try {
    chrome.storage.local.set({ openAIKey: data });
    setState(data);
  } catch (e) {
    console.error("Error saving to local state");
    console.error(e);
  }
};
