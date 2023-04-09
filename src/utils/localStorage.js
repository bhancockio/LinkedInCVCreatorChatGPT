/*global chrome*/

// Function to save data to local storage or Chrome extension storage
export const saveData = (key, data) => {
  if (isChromeExtension()) {
    try {
      // Save data to Chrome extension storage
      chrome.storage.local.set({ [key]: data });
    } catch (error) {
      console.error("Error saving to local state");
      console.error(error);
    }
  } else {
    // Save data to local storage
    return Promise.resolve(localStorage.setItem(key, JSON.stringify(data)));
  }
};

// Function to load data from local storage or Chrome extension storage
export const loadData = (key) => {
  if (isChromeExtension()) {
    try {
      // Load data from Chrome extension storage
      return chrome.storage.local.get(key).then((data) => data[key]);
    } catch (error) {
      console.error("Error loading from local state");
      console.error(error);
    }
  } else {
    // Load data from local storage
    return Promise.resolve(JSON.parse(localStorage.getItem(key)));
  }
};

// Function to check if the environment is a Chrome extension
const isChromeExtension = () => {
  return !!chrome?.storage;
};
